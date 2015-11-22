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
- Observability: The degree to which it is possible to observe (intermediate and final) test results.
- Isolateability: The degree to which the component under test (CUT) can be tested in isolation.
- Separation of concerns: The degree to which the component under test has a single, well defined responsibility.
- Understandability: The degree to which the component under test is documented or self-explaining.
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

DuckieTV has two types of tests Karma and Protractor unit tests. Being a software with a lot of dependencies it has not only the need to control the state of the components being tested but also the third part software that is being used by them.
As said before, DuckieTV has very few tests which allowed CUTs (components under test) to be controlled easier. One of the methods to deal with the HTTP responses was by overriding the respond function as seen on the image below.

![HTTP Backend Override](http://i.imgur.com/277gDP3.png)
