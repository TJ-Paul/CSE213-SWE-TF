# 🌙 Last Night Memorize Sheet

This sheet collects everything that you must be able to reproduce **word for word** in the exam: official definitions, rules, notation and formulas. It is not a place to learn a topic for the first time, because every item here is explained in full in its concept note (linked in each heading). Read it slowly the night before the exam and once more in the morning. For each item, cover the text, say it from memory, and then check.

---

## 1. Design pattern definitions (slide wording)

→ [[IJ-1 Structural Design Patterns]] · [[IJ-2 Behavioral Design Patterns]] · [[AI-2 Creational Design Patterns]]

> [!important] 🔑 Creational
> **Factory Method** — ==Define an interface for creating an object, but let subclasses decide which class to instantiate. Factory Method lets a class defer instantiation to subclasses.==
> **Abstract Factory** — ==Provide an interface for creating families of related or dependent objects without specifying their concrete classes.==
> **Singleton** — ==Ensure a class has only one instance, and provide a global point of access to it.==
> **Builder** — ==Separate the construction of a complex object from its representation so that the same construction process can create different representations.==

> [!important] 🔑 Structural
> **Decorator** — ==Decorator lets you attach new behaviors to objects by placing these objects inside special wrapper objects that contain the behaviors.==
> **Composite** — ==Composite pattern lets you compose objects into tree structures and then work with these structures as if they were individual objects.==
> **Adapter** — ==Convert the interface of a class into another interface clients expect. Adapter lets classes work together that couldn't otherwise because of incompatible interfaces.==
> **Bridge** — ==Bridge lets you split a large class or a set of closely related classes into two separate hierarchies, abstraction and implementation, which can be developed independently of each other.==
> **Facade** (not in slides) — Provide a unified, simplified interface to a set of interfaces in a subsystem.

> [!important] 🔑 Behavioral
> **Strategy** — ==Define a family of algorithms, encapsulate each one, and make them interchangeable. Strategy lets the algorithm vary independently from the clients that use it.==
> **Template Method** — ==Defines the skeleton of an algorithm in the superclass but lets subclasses override specific steps of the algorithm without changing its structure.== (The template method is `final`.)
> **Observer** — ==Define a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.==
> **Mediator** — ==Restricts direct communications between objects and forces them to collaborate only via a mediator. Lets you reduce chaotic dependencies between objects.==
> **Command** — ==Turns a request into a stand-alone object that contains all information about the request. This lets you parameterize methods with different requests, delay or queue a request's execution, and support undoable operations.==
> **State** — ==Allow an object to alter its behavior when its internal state changes. The object will appear to change its class.==
> **Chain of Responsibility** (not in slides) — Avoid coupling the sender of a request to its receiver by giving more than one object a chance to handle it; chain the receivers and pass the request along the chain until an object handles it.

The pattern families are worth knowing by heart. **Structural** patterns explain how to assemble objects and classes into larger structures while keeping the structure flexible and efficient. **Behavioral** patterns deal with how objects behave and interact, and are concerned with algorithms and the assignment of responsibilities between objects. The Gang of Four catalogue has 23 patterns: 5 creational (Factory Method, Abstract Factory, Builder, Prototype, Singleton), 7 structural (Adapter, Bridge, Composite, Decorator, Facade, Flyweight, Proxy) and 11 behavioral (Interpreter, Template Method, Chain of Responsibility, Command, Iterator, Mediator, Memento, Observer, State, Strategy, Visitor). The four essential elements of a pattern are **Intent, Problem, Solution and Consequences**.

> [!important] 🔑 The comparison lines examiners love
> **Strategy vs Template:** Template Method is based on ==inheritance== and works at the ==class level, so it is static==. Strategy is based on ==composition== and works at the ==object level, letting you switch behaviour at runtime==.
> **Mediator vs Observer:** Mediator ==eliminates mutual dependencies==, because objects depend on a single mediator. Observer establishes a ==dynamic one-way one-to-many connection== (objects can subscribe and unsubscribe).
> **Command vs Mediator:** Command establishes ==unidirectional connections between senders and receivers==. Mediator ==eliminates direct connections== and forces communication via the mediator.
> **State vs Strategy:** They are "twins separated at birth". Both are based on composition and change the context's behaviour by delegating to helper objects. Strategy makes these objects ==completely independent and unaware of each other==. State ==doesn't restrict dependencies between concrete states==, letting them alter the state of the context at will.
> **Object vs Class adapter:** The object adapter uses composition (implements the target and wraps the adaptee) and works in every language. The class adapter uses multiple inheritance, so it is possible only in languages like C++.

---

## 2. Design principles

→ [[AI-1 Design Principles (SOLID)]]

> [!important] 🔑 SOLID
> **S — Single Responsibility:** ==A class should have just one reason to change.==
> **O — Open/Closed:** ==Classes should be open for extension but closed for modification.==
> **L — Liskov Substitution:** ==Objects of a subclass must be usable in place of objects of the parent class without breaking the client code.== Extend the base behaviour, do not replace it.
> **I — Interface Segregation:** ==Clients shouldn't be forced to depend on methods they do not use.== Keep interfaces narrow.
> **D — Dependency Inversion:** ==High-level classes shouldn't depend on low-level classes; both should depend on abstractions. Abstractions shouldn't depend on details; details should depend on abstractions.==

The general principles are also worth one line each. **Encapsulate what varies** means you separate the parts that change from the parts that stay the same. **Program to an interface, not an implementation.** **Favor composition over inheritance**, because inheritance causes subclass explosion and, with multiple inheritance, the diamond problem.

---

## 3. UML notation

→ [[AI-3 Class Diagram]] · [[AI-5 Sequence and Collaboration Diagram]] · [[AI-4 State Diagram]] · [[AI-6 Use Case Diagram]]

Visibility is shown as ==`+` public, `-` private, `#` protected, `~` package, `/` derived==. Static members are underlined. An abstract class name is written in *italics*, and an interface has «interface» above its name. An attribute is written `visibility name : type [count] = default`, and an operation is written `visibility name(param:type) : returnType`. Omit the return type for constructors and void methods.

For relationships: **generalization** to a class is a solid line with a ==hollow triangle== pointing to the parent, and **realization** of an interface is a ==dashed line with a hollow triangle==. **Association** is a plain solid line with an optional name, multiplicity and navigability arrow. **Aggregation** ("is part of") has a ==hollow diamond== on the whole. **Composition** ("is entirely made of", parts live and die with the whole) has a ==filled diamond== on the whole. **Dependency** ("uses temporarily") is a ==dashed arrow==. Multiplicity is written as `1`, `*`, `0..1`, `1..*`, `2..4`. An **association class** holds properties of the link itself, such as a Job between Company and Person.

In sequence diagrams, a **synchronous** message is a solid line with a filled arrowhead, an **asynchronous** message is a solid line with an open (stick) arrowhead, and a **return** is a dashed line with an open arrowhead. The **activation** bar is the thin box on a lifeline, **creation** is an arrow labelled `new`, and **deletion** is an X at the bottom of the lifeline. The frames are `opt` (if), `alt` (if/else) and `loop`. A collaboration diagram shows the same information without the time axis, using nested sequence numbers such as 3.1 and 3.1.1.

In state diagrams, a transition is labelled ==`event [guard] / action`==, and a state can hold `entry /`, `exit /` and `do /` activities. The four event types are **change** (`when` a condition becomes true), **call** (an operation is called), **signal** (an asynchronous signal arrives) and **elapsed-time** (`after` a period).

In use case diagrams, the `<<include>>` arrow goes from the ==base use case to the included use case== (the included behaviour always happens). The `<<extend>>` arrow goes from the ==extension use case to the base use case== (optional behaviour). Generalization uses a hollow triangle. Actors are outside the system boundary.

---

## 4. Process models and agile

→ [[IJ-3 Process Models and Agile]]

The **five framework activities** are ==Communication, Planning, Modeling, Construction, Deployment==. The **four process flows** are ==Linear, Iterative, Evolutionary, Parallel==.

**Waterfall** is used for small projects with well-defined requirements known before starting. Its advantages are that it is simple, its workflow is easy to understand, and it is easy to manage. Its disadvantages are that the client must give all requirements up front, testing and client evaluation come last (high risk), and there is no iteration.

**Incremental** delivers a ==core product first==, then increments, with client feedback after each one. Its advantages are flexibility to change, an early working product, easy testing and a lower initial cost. Its disadvantages are that breaking the problem into increments is difficult, the total cost is high, ==complete planning is required before committing==, and refining requirements may affect the architecture.

**Prototyping** is used when requirements are ==vague and likely to change==. Its advantages are client involvement, early error detection, and the fact that detailed requirements are not needed. Its disadvantages are that it can slow the process, frequent changes increase complexity, and dissatisfied clients may cause prototypes to be scrapped.

**Spiral** is a series of versions with ==risk analysis in every loop==. It tackles risk rigorously and accepts late changes, but it is costly and complicated and requires risk-assessment expertise. In the incremental model, requirements are specified beforehand and refined; in evolutionary models, requirements are allowed to evolve.

**Scrum:** a ==Sprint== lasts 2 weeks to 1 month. The **product backlog** holds all client requirements, and the **sprint backlog** holds the requirements chosen for this sprint. A sprint has four phases: ==planning, implementation, product review, process review (retrospective)==. Unfinished items go back to the product backlog. The roles are Scrum Master and Product Owner, and the practices include the daily scrum and the scrum board with tickets.

**Kanban** means "signboard". It works through visualization with kanban cards on a kanban board and is a ==pull system with no sprints (continuous)==. Developers adjust the workload per card to maintain the lead time.

**XP** takes good practices to the extreme. It uses ==pair programming== (a driver writes code and a navigator reviews and thinks strategically), user stories, and testing from day one.

---

## 5. Testing

→ [[AI-8 Software Testing Fundamentals]] · [[AI-9 Code Coverage and White-box Testing]] · [[AI-10 Equivalence Partitioning and BVA]] · [[IJ-4 Unit Testing and JUnit]]

> [!important] 🔑 Testing definitions
> **Verification** — ==Are we building the product right?== (Does each phase's output satisfy the conditions set at the start of that phase?) **Validation** — ==Are we building the right product?== (Does it satisfy the specified requirements?)
> **Mistake** — a human action that produces an incorrect result. **Fault/Defect** — an incorrect step, process or data definition in a program. **Failure** — the inability of a system to perform its required function. **Error** — the difference between a computed value and the correct value.
> **Fault avoidance** prevents errors before release (reviews, inspections, testing). **Fault tolerance** lets the system recover by itself (rollbacks, redundancy, mirroring).
> **Six types of testing:** ==Unit, Integration, Non-functional, Acceptance, Regression, Beta.== A **smoke test** is the subset of regression tests showing that the system is stable and its major functions work.
> **Code coverage** — the degree to which the source code is tested by a test suite. **Method coverage:** have all methods been called? **Statement coverage:** have all statements been executed? **Branch/Decision coverage:** has every decision taken both true and false? **Condition coverage:** has every individual boolean condition been both true and false?
> **Equivalence partitioning** divides the input into partitions treated the same way by the software, and tests only ==one value from each partition==. **BVA** tests ==at the boundaries between partitions==, because more errors occur there.
> **Weak ECT** needs ==max(number of classes in any one variable)== test cases. **Strong ECT** needs ==the product of the class counts== (the Cartesian product).
> **Cyclomatic complexity** V(G) = ==E − N + 2== = number of decision points + 1 = number of regions.

> [!important] 🔑 Good unit test and JUnit
> A good unit test is ==Automatic, Atomic, Single-responsibility, Independent and Repeatable==.
> The JUnit framework has four features: ==Fixtures, Test suites, Test runners, JUnit classes==. A **fixture** is a fixed state of a set of objects used as a baseline, so that results are repeatable (`@Before`/`@BeforeEach` runs before each test, `@After`/`@AfterEach` runs after each test).
> The assertions are `assertEquals(expected, actual)` (expected value on the LEFT), `assertTrue`, `assertFalse`, `assertNull`, `assertNotNull`, `assertSame`, `assertNotSame`, `fail()`, and `assertThrows(X.class, () -> ...)`.
> **TDD** follows the cycle ==Red → Green → Refactor==: write a failing test, write the minimum code to pass it, then clean up.

---

## 6. Refactoring

→ [[IJ-6 Refactoring and Code Smells]]

> [!important] 🔑 Refactoring definitions
> **Refactoring (noun):** ==a change made to the internal structure of software to make it easier to understand and cheaper to modify without changing its observable behavior.==
> **Code smell:** a surface symptom in code that usually indicates a deeper design problem. It is not a bug, but it makes the code hard to change.
> **Technical debt:** the future extra cost of rework that you take on when you choose a quick or easy solution now instead of a better one. Like money debt, it grows "interest" until it is repaid by refactoring.
> **Rule of Three:** the first time, just do it; the second time, wince and duplicate; the ==third time, refactor==. You should also refactor when adding a function, when fixing a bug, and during code review.

These are the smells with their usual cures. **Duplicated Code** is cured by Extract Method or Pull Up Method. **Long Method** is cured by Extract Method. **Large Class** is cured by Extract Class. **Long Parameter List** is cured by Introduce Parameter Object. **Divergent Change** (one class changed for many reasons) is cured by Extract Class. **Shotgun Surgery** (one change touches many classes) is cured by Move Method/Field. **Feature Envy** is cured by Move Method. **Data Clumps** are cured by Extract Class or Introduce Parameter Object. **Primitive Obsession** is cured by Replace Primitive with Object. **Switch Statements and type codes** are cured by Replace Conditional with Polymorphism. **Lazy Class** is cured by Inline Class. **Data Class** is cured by moving behaviour into it. **Comments used as deodorant** are cured by Extract Method with a good name. **Refused Bequest** is cured by Replace Inheritance with Delegation. **Parallel Inheritance Hierarchies** are cured by Move Method so that one hierarchy disappears. **Nested conditionals** are cured by Replace Nested Conditional with Guard Clauses. **Magic numbers** are cured by Replace Magic Number with Symbolic Constant.

---

## 7. Code review, ethics, requirements

→ [[IJ-5 Code Reviews]] · [[IJ-7 Software Ethics]] · [[IJ-8 Requirement Analysis]]

**Code review** is the process of analyzing code written by a teammate (a peer) to judge whether it is of sufficient quality to be integrated into the main codebase. The **issues it finds** are ==coding style, redundant checks, project design violations, misunderstood requirements, critical security defects, malicious code, inadequate input validation, unsafe methods, and lack of exception handling==. The **Fagan inspection** steps are Planning, Overview, Preparation, Meeting, Rework, Follow-up. The **best practices** are to review fewer than 200–400 lines at a time, have the author annotate the code, set measurable goals and metrics (inspection rate, defect rate, defect density), use checklists, verify that defects are fixed, and build a positive review culture.

**The fundamental ethical question** is ==Does this system do what it should, for whom it should, without harm?== The **IEEE-CS/ACM 8 principles** are ==Public, Client & Employer, Product, Judgment, Management, Profession, Colleagues, Self==, and Public is the top priority. The **8 dimensions** of software ethics are Data Privacy, Bias & Fairness, Accountability, Transparency, Autonomy, Security Duty, Sustainability, and IP & Authorship.

The **requirement pipeline** is ==Elicitation → Analysis & Refinement → Specification → Validation==. A **functional** requirement states what the system must do, and a **non-functional** requirement states how well it performs. **MoSCoW** stands for ==Must have, Should have, Could have, Won't have==. A good requirement is ==Unambiguous, Verifiable (testable), Complete, Consistent, Measurable, Feasible==. An **RTM** links goals forward to test cases and backward to their origin.
