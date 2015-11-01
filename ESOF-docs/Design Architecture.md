#Design Architecture

1. [Introduction] (#introduction)

2. [4 + 1 Architectural Model] (#4-+-1-architectural-model)

    1. [Logical View] (#logical-view)
        1. Package Diagram
  
    2. [Implementation View] (#deployment-view)
        1. Component Diagram

    4. [Process View] (#process-view)
        1. Diagram

    5. [Deployment View] (#deployment-view)
        1. Diagram


## Introduction
Every project should have a set of diagramas that make project understanding easier to other users. So, in this report we will talk about how DuckieTV is distributed in componenets, how they interact with each other, how they are distributed and what are the requirements to run this software.

We will use the [4+1 architectural model](https://en.wikipedia.org/wiki/4%2B1_architectural_view_model), a wide known architectural view model that is used for

> Describing the architecture of software-intensive systems, based on the use of multiple concurrent views.

The four views of this model are logical, development, process and physival view. In addition use cases are also used to illustrate the architecture.

## 4 + 1 Architectural Model

### Logical view
Logical view is used to show the key abstractions in the system as objects, object classes or their packages.

#### UML Package Diagram
Packages are a grouping mechanism in UML that may group several elements of any type and even other packages. This diagram focuses on the dependencies between all the packages of the software.

![Package Diagram](http://i.imgur.com/sm1QUgb.png)

### Implementation view
Implementation view has the goal of showing software components and the dependencies among them.

#### UML Component Diagram
A component diagram representas a system module that encapsulates its contentes. It can be a library, executable, database, etc. The way components are organized create a provider and consumer  relationship.

![Component Diagram](http://i.imgur.com/ZPFajspl.jpg)

### Process View
Process view is a way to show how the system is communicate in run-time.
#### UML Activity Diagram
![Activity Diagram]()

### Deployment View
This view shows the system hardware and the software components distribution among hardware components which are represented as *nodes*. Each node contains *artifacts* representing the software.

#### UML Deployment Diagram
![Deployment Diagram]()
