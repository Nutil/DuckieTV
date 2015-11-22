# Software Tests
1. [Degree of Testability] (#degree-of-testability)
     1. [Controllability] (#controllability)
     2. [Observability] (#observability)
     3. [Isolateability] (#isolateability)
     4. [Separation of Concerns] (#separation-of-concerns)
     5. [Understandability] (#understandability)
     6. [Heterogeneity] (#heterogeneity)
2. [Test Statistics] (#statistics)
3. [Bug Report] (#bug-report)

1) Degree of Testability of the software program
Topics: Discuss how 'testable' is the program. Discuss how to improve the testability of software components.

The testability of software components (modules, classes) is determined by factors such as:
- Separation of concerns: The degree to which the component under test has a single, well defined responsibility.
- Heterogeneity: The degree to which the use of diverse technologies requires to use diverse test methods and tools in parallel.

2) Test Statistics
     Number of tests (# tests unitários; # tests de sistema, # tests de desempenho, ...)
     % coverage (given by tools like EclEmma)
     Code coverage: is it any good? (see http://avandeursen.com/2013/11/19/test-coverage-not-for-managers/)

3) [Opcional] Take a bug report, create test cases to reproduce it, and fix it, eventually using automated software fault diagnosis techniques. (grade >18)

# Introduction

With this report we have the goal of analyzing the software tests developed for [DuckieTV](https://schizoduckie.github.io/DuckieTV/) through the Validation and Verification ([V&V](https://en.wikipedia.org/wiki/Verification_and_validation) ).

In order to accomplish our goal we will explore how testable is the software, the controllability of the test components, the observability of them and the isolateability of each tested component. 

We will also discuss how each component is contained for a single and well defined responsability as well as the understandability of it (how well documented it is). The degree to which the use of diverse technologies requires to use diverse test methods and tools in parallel will also be discussed.

Last but not least there will be some statistics regarding the code coverage of the tests and a critical analyzis to it.

# Degree of Testability

Unfortunately DuckieTV is not well tested. Its tests haven't been updated for more than 9 months even with new features being released. It will be a hard task to discuss certain topics regarding this main topic, but we will do our best.

## Controllability

DuckieTV has two types of tests Karma and Protractor unit tests and Travis IC integration tests. Being a software with a lot of dependencies it has not only the need to control the state of the components being tested but also the third part software that is being used by them.

As said before, DuckieTV has very few tests which allowed CUTs (components under test) to be controlled easier. One of the methods to deal with the HTTP responses was by overriding the respond function as seen on the image below.

![HTTP Backend Override](http://i.imgur.com/277gDP3.png)

## Observability

Why do we have tests if you can not see and analyze the results?
Well the observability is one of the key factors of unit testing. We can only know what went wrong if you can see the test results.

As said before DuckieTV use [Karma](http://karma-runner.github.io/0.13/index.html) and [Protractor](https://angular.github.io/protractor/#/) for unit testing and [Travis CI] (https://travis-ci.org/SchizoDuckie/DuckieTV) for integration tests.

In this topic we will sadly be unable to discuss Karma and Protractor unit tests since we tried to run them but ended up either with an error message regarding some malformed tests or with zero tests ran.

Travis CI is used to make integration tests on pull requests made by the contributors. There are several jobs that are executed and each one must pass the tests in order to be considered a successfull build.

![Travis IC Build](http://i.imgur.com/IuPMFS3.png)

### Isolateability

Every project should have its components in a complete isolation, which means that for each feature it should exist one and only one component that takes care of it. That component should not depend on others in order to work. That way creating tests and validating the results would be more accurate.

DuckieTV is dependent of several third part libraries which makes it almost impossible to test the components in a complete isolation. Moreover DuckieTV module is needed for every component test as you can state in the following picture.

![DuckieTV Module](http://i.imgur.com/Z6JROgm.png)

The design of this software with a centralized module is not the best for unit tests that as the name suggests are tests for single units, not for units with external dependencies.

### Understandability

While creating tests for the components it is very important to know all of its features. However that is only possible if the author(s) of the component has documented it. In open-source projects that documentation is most important as there will be contributions from other persons that need to understand how it works.

Regarding documentation, DuckieTV is very well documented as well as organized following the JavaDocs documentation pattern.

![Documentation OpenHub DuckieTV](http://i.imgur.com/ApGV6oM.png)

Through out the code there are several elements, such as self-explaining variables and comments, that makes the understandability of this project a lot easier.

![Code Documentation](http://i.imgur.com/ZmP6bPl.png)
