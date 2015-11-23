# Software Tests
1. [Degree of Testability] (#degree-of-testability)
     1. [Controllability] (#controllability)
     2. [Observability] (#observability)
     3. [Isolateability] (#isolateability)
     4. [Separation of Concerns] (#separation-of-concerns)
     5. [Understandability] (#understandability)
     6. [Heterogeneity] (#heterogeneity)
2. [Test Statistics] (#statistics)

## Introduction

With this report we have the goal of analyzing the software tests developed for [DuckieTV](https://schizoduckie.github.io/DuckieTV/) through Validation and Verification ([V&V](https://en.wikipedia.org/wiki/Verification_and_validation) ).

In order to accomplish our goal, we will explore how testable the software is, as well as the controllability, observability and isolateability of the test components.

We will also discuss how each component is contained for a single and well defined responsability as well as how understandable it is(how well documented it is). The degree to which the use of diverse technologies requires the use of diverse test methods and tools in parallel will also be discussed.

Last but not least there will be some statistics regarding the code coverage of the tests, including a critical analyzis of the current test scenario of DuckieTV.

## Degree of Testability

Unfortunately, DuckieTV is not well tested. Its tests haven't been updated for over 9 months, even with new features being released. It will be a hard task to discuss certain topics in this report due to the absence of updates regarding the subject.

### Controllability

DuckieTV has two types of tests: unit tests ran with Karma and Protractor and integration tests ran through Travis IC. Being a software with a lot of dependencies it has not only the need to control the state of the components being tested but also the third part software that is being used by them.

As said before, DuckieTV has very few tests, which allows CUTs (components under test) to be controlled easier. One example of how easy most tests are to control is the methods to deal with the HTTP responses, where the only thing that needs to be changed for the test scenario is overriding the respond function as seen on the image below.

![HTTP Backend Override](http://i.imgur.com/277gDP3.png)

### Observability

Why do we have tests if you can not see and analyze the results?
Well the observability is one of the key factors of acessing unit testing. We can only know what went wrong if we can see the test results.

As said before DuckieTV uses [Karma](http://karma-runner.github.io/0.13/index.html) and [Protractor](https://angular.github.io/protractor/#/) for unit testing and [Travis CI] (https://travis-ci.org/SchizoDuckie/DuckieTV) for integration tests.

In this topic we will sadly be unable to discuss Karma and Protractor unit tests since we tried to run them, but ended up either with an error message regarding some malformed tests or with zero tests ran.

Travis CI is used to automate testing of the code base every time the repository is updated, namely the 'angular' branch. A few jobs are executed prior to testing as a prerequisite, and both those and the actual testing must pass in order to be considered a successful build. Ultimately the integration testing relies on unit testing provided by Karma and, as mentioned before, we observed that no test were actually executed.

![Travis IC Build](http://i.imgur.com/IuPMFS3.png)

### Isolateability

Every project should have its components in complete isolation, which means that for each feature there should exist one and only one component that takes care of it. That component should not depend on others in order to work. That way, creating tests and validating the results would be more accurate.

DuckieTV is dependant on several third party libraries, which makes it almost impossible to test the components in complete isolation. Moreover, the DuckieTV module is needed for every component test, as you can state in the following picture.

![DuckieTV Module](http://i.imgur.com/Z6JROgm.png)

The design of this software with a centralized module is not the best for unit tests which, as the name suggests, are tests for single units, and not for units with external dependencies.

### Understandability

While creating tests for the components, it is very important to know all of its features. However, that is only possible if the author(s) of the component has documented it. In open-source projects, a clear documentation is of utmost importancy, since there will be contributions from other people, who must understand how the software works beforehand.

Regarding documentation, DuckieTV is very well documented as well as organized following the JavaDocs documentation pattern.

![Documentation OpenHub DuckieTV](http://i.imgur.com/ApGV6oM.png)

There are several elements throughout the code, such as self-explaining variables and comments, that make the understandability of this project a lot easier.

![Code Documentation](http://i.imgur.com/ZmP6bPl.png)

### Heterogeneity

Despite having only a handfull of contributors, it is necessary ensure that when merging pull requests, the program remains fully functional.

This problem can be overcome with 2 metods: unit testing or integration testing. DuckieTV uses Travis CI to automate this by clearing integration tests, ultimately ensuring the correct functionality of the program after applying the new changes.

We can conclude that the use of a repository GitHub open to various contributors results in a heterogeneity of test tools used.


### Statistics

Because, as mentioned before, we were unable to run the tests, we do not have a means to tell exactly how much of DuckieTV is covered by the tests. However, our rough estimate lies between the 10% and 15% mark. This is an optimistic guess, it may very well even be lower than that, but never more than 15%. DuckieTV really lacks testing. In its current state, the vast majority of DuckieTV's functionalities are completely untested and any change to old code would require extended developer time to ensure proper functioning, because no tests would ensure the code works properly for the developer to save time.

## Critical Analysis

Even though DuckieTV has some unit and integration tests, they have not been updated for a long time. This maybe even be one of the reasons why we couldn not even run the tests. Several features as well as new libraries were added without being tested, that may prove to become a problem in the future, when bugs start to be detected.

The fact that every component depends on the DuckieTV module will make the creation of new tests more difficult. This dependancy may be the reason why the developers have not dedicated their time to developing more tests.

Of course, not everything is bad. This project is very well documented, several diagrams were created so that new contributors could understand the logic behind the chosen organization, to compensate for the lack of tests present.
There are inline comments and the variables naming is self-explanatory, which helps the most when analysing a function.

Summing up, DuckieTV **must** create unit tests for the existing features and the future ones, as well as keep up with the good documentation techniques.

### Authors
* João Silva ([up201305892@fe.up.pt](mailto:up201305892@fe.up.pt))
* Luís Figueiredo ([up201304295@fe.up.pt](mailto:up201304295@fe.up.pt))
* Pedro Teles ([up201305101@fe.up.pt](mailto:up201305101@fe.up.pt))
* Tiago Figueiredo ([ei12069@fe.up.pt](mailto:ei12069@fe.up.pt))

**Faculdade de Engenharia da Universidade do Porto - MIEIC**
**2015-10-16**
