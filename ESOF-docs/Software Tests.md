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
- Controllability: The degree to which it is possible to control the state of the component under test (CUT) as required for testing.
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

In order to accomplish our goal we will explore how testable is the software, the controllability of the test components, the observability of them and the isolateability of each tested component. We will also discuss how each component is contained for a single and well defined responsability as well as the understandability of it (how well documented it is). The degree to which the use of diverse technologies requires to use diverse test methods and tools in parallel will also be discussed.

# Degree of Testability

