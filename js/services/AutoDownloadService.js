/**
 * The AutoDownloadService checks if a download is available for a TV-Show that's aired
 * and automatically downloads the first search result if more than minSeeders seeders are available.
 *
 */
DuckieTV

.factory('AutoDownloadService', ["$rootScope", "FavoritesService", "SceneNameResolver", "SettingsService", "TorrentSearchEngines", "DuckieTorrent", "TorrentHashListService",
    function($rootScope, FavoritesService, SceneNameResolver, SettingsService, TorrentSearchEngines, DuckieTorrent, TorrentHashListService) {

        var period = SettingsService.get('autodownload.period'); // Period to check for updates up until today current time, default 1
        var minSeeders = SettingsService.get('autodownload.minSeeders'); // Minimum amount of seeders required, default 50

        var service = {
            checkTimeout: null,
            autoDownloadCheck: function() {
                //console.debug("Episode air check fired");
                if (SettingsService.get('torrenting.autodownload') === false) {
                    service.detach();
                    return;
                }

                var lastRun = SettingsService.get('autodownload.lastrun'),
                    from = new Date();
                if (lastRun) {
                    from = new Date(lastRun);
                }
                from.setDate(from.getDate() - period); // substract autodownload period from lastrun for if some episodes weren't downloaded.
                from.setHours(0);
                from.setMinutes(0);
                from.setSeconds(0);

                if (DuckieTorrent.getClient().isConnected()) {
                    DuckieTorrent.getClient().AutoConnect().then(function(remote) {
                        // Get the list of episodes that have aired since period, and iterate them.
                        FavoritesService.getEpisodesForDateRange(from.getTime(), new Date().getTime()).then(function(candidates) {
                            candidates.map(function(episode, episodeIndex) {
                                if (episode.isDownloaded()) return; // if the episode was already downloaded, skip it.
                                if (episode.watchedAt !== null) return; // if the episode has been marked as watched, skip it.
                                if (episode.magnetHash !== null && (episode.magnetHash in remote.torrents)) return; // if the episode was already downloaded, skip it.

                                CRUD.FindOne('Serie', {
                                    ID_Serie: episode.ID_Serie
                                }).then(function(serie) {
                                    if (serie.autoDownload == 1) {
                                        service.autoDownload(serie, episode, episodeIndex).then(function(result) {
                                            if (result) {
                                                // store the magnet hash on the episode and notify the listeners of the change
                                                $rootScope.$broadcast('magnet:select:' + episode.TVDB_ID, [result]);
                                            }
                                        });
                                    }
                                });
                            });
                            SettingsService.set('autodownload.lastrun', new Date().getTime());
                        });
                    });

                }

                service.checkTimeout = setTimeout(service.autoDownloadCheck, 60000 * 15); // fire new episodeaired check in 15 minutes.
            },

            autoDownload: function(serie, episode, episodeIndex) {
                // Fetch the Scene Name for the series and compile the search string for the episode with the quality requirement.
                var q = SceneNameResolver.getSceneName(serie.TVDB_ID, serie.name) + ' ' + episode.getFormattedEpisode();
                var searchString = q + ' ' + $rootScope.getSetting('torrenting.searchquality');
                //console.debug("Auto download!", searchString);
                /**
                 * Word-by-word scoring for search results.
                 * All words need to be in the search result's release name, or the result will be filtered out.
                 */
                function filterByScore(item) {
                    var score = 0;
                    var query = q.toLowerCase().split(' ');
                    name = item.releasename.toLowerCase();
                    query.map(function(part) {
                        if (name.indexOf(part) > -1) {
                            score++;
                        }
                    });
                    return (score == query.length);
                }

                var episodestring = 0;
                // Search torrent provider for the string
                return TorrentSearchEngines.getDefaultEngine().search(searchString, true).then(function(results) {
                    var items = results.filter(filterByScore);
                    if (items.length === 0) {
                        return; // no results, abort
                    }
                    if (items[0].seeders == 'N/A' || parseInt(items[0].seeders, 10) >= minSeeders) { // enough seeders are available.
                        var url = items[0].magneturl;
                        var torrentHash = url.match(/([0-9ABCDEFabcdef]{40})/)[0].toUpperCase();
                        // launch the magnet uri via the TorrentSearchEngines's launchMagnet Method
                        DuckieTorrent.getClient().AutoConnect().then(function() {
                            TorrentSearchEngines.launchMagnet(url, serie.TVDB_ID, true);
                            episode.magnetHash = torrentHash;
                            episode.Persist();
                            // record that this magnet was launched under DuckieTV's control. Used by auto-Stop.
                            TorrentHashListService.addToHashList(torrentHash);
                        });
                        return torrentHash;
                    }
                });
            },
            attach: function() {
                if (!service.checkTimeout) {
                    service.checkTimeout = setTimeout(service.autoDownloadCheck, 5000);
                    $rootScope.$on('torrentclient:connected', function(remote) {
                        console.log(" Caught TorrentClient connected event! starting autodownloadcheck!");
                        service.autoDownloadCheck();
                    });
                }
            },
            detach: function() {
                clearTimeout(service.checkTimeout);
                service.checkTimeout = null;
            }
        };
        return service;
    }
])

/**
 * Attach auto-download check interval when enabled.
 */
.run(["$rootScope", "AutoDownloadService", "SettingsService",
    function($rootScope, AutoDownloadService, SettingsService) {

        if (SettingsService.get('torrenting.enabled') === true && SettingsService.get('torrenting.autodownload') === true) {
            setTimeout(function() {
                console.info('Initializing AutoDownload Service!');
                AutoDownloadService.attach();
            }, 5000);
        }
    }
]);