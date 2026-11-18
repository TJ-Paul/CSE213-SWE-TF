# 📊 Question Analysis — what each section asks

This note breaks down the last five years of term finals (2019-20 to 2023-24, which is seven papers in total, because 2023-24 has two papers) section by section and question by question. The goal is simple: before you walk into the hall you should already know that "one set in Section A will be a big pattern question, one set will be something I skipped and can drop", and so on. Read the blueprint in Part 1 first. Parts 2 and 3 are the evidence behind it. Part 4 tells you what to do with this knowledge.

Each question part carries a mark in square brackets and one of three tags. ✅ means the topic is in this vault, and the link takes you to the note where it is taught and worked. ⏭ means it belongs to a topic you chose to skip (security, EVM/CPM/COCOMO, risk, caching/performance, DevOps, architecture). ⚪ means an old CSE 307 theory topic that is not in your current slides at all.

> [!important] 🔑 The one-line summary
> ==In every section of every recent paper, at least one full set is a design-pattern set, and at least one full set is a topic you skipped.== The mandatory set (Q1 / Q5) almost always contains a pattern or refactoring question plus a testing question. So patterns, refactoring and testing are the three things that decide your grade.

---

## Part 1 — The blueprint

### How the paper is built

Both sections carry 105 marks, and the full paper is 210 marks in 3 hours. Each section has four sets of questions, and each set has two or three parts worth 5 to 20 marks. The current CSE 213 format, used in both 2023-24 papers and also in the 2022-23 CSE 307 paper, makes ==Q1 compulsory in Section A and Q5 compulsory in Section B==, and you choose any two of the other three sets in each section. The older CSE 307 papers (2019-20, 2020-21, 2021-22) had no compulsory set: you answered any three of four. Topics are ==not divided by teacher==. IJ ma'am's patterns and AI sir's creational patterns and testing appear together in both sections.

### Section A — the typical shape (from the three newest papers)

==Q1, the compulsory set, opens with one 15-mark design pattern question in two of the three newest papers== (Factory Method in May-2026, Adapter in 2022-23), followed by one or two short theory parts from ethics, process models or testing. The exception is Feb-2025, whose Q1 was a use case diagram plus security and password test cases.

==One optional set is a pattern-heavy set== in all three papers. It is a 15–20 mark pattern question with diagram and code, sometimes combining two patterns (Composite + Decorator, Observer + Chain of Responsibility), paired with a smaller part on code review, SOLID or a pattern UML.

==One optional set is fully or mostly a skipped topic== in all three papers: EVM plus caching/sharding/CDN (May-2026), security (Feb-2025), and caching plus CI/CD after a Builder question (2022-23). This is the set you drop.

==The remaining optional set is refactoring or testing==: five code smells with refactored code (May-2026), TDD plus white-box plus EP (Feb-2025), or Observer plus a class diagram plus condition coverage (2022-23).

So in Section A your two optional choices are almost always ==the pattern set and the refactoring/testing set==.

### Section B — the typical shape

==Q5, the compulsory set, is a pattern or refactoring question plus a testing question.== May-2026 had equivalence class testing, then Mediator and Command, then a requirements question. Feb-2025 had Abstract Factory, Adapter + Facade, and why test coverage matters. 2022-23 was entirely refactoring: four smell definitions plus three "refactor this code" parts.

==One optional set is testing-heavy==, covering a JUnit test class, integration testing with stubs and drivers, a performance testing plan, BVA and a code-review style "find the problems in this code". These appeared as May-2026 Q6 and Q7.

==One optional set is process models / agile / ethics==, often with a refactoring part attached: Feb-2025 Q8 (incremental vs agile, manager vs leader, refactoring) and 2022-23 Q6 (generic process model, Waterfall, Kanban, Scrum).

==One or two optional sets are skipped topics==: risk, EVM, CPM, security and performance (Feb-2025 Q7, 2022-23 Q7 and Q8). In May-2026, Section B had a pure design pattern set instead (Q8: Strategy inside Template, Observer, State vs Strategy).

> [!warning] ⚠️ The one trap in the blueprint
> In 2022-23 Section B, ==two of the four sets (Q7, Q8) were fully skipped topics==, and Q5 was compulsory. That leaves only Q6 as a free choice, so one of your three answers had to come from Q7 or Q8. Your skip decision costs marks in a paper like that. If you have one spare evening before the exam, the cheapest way to cover this gap is a quick read of EVM formulas (SV, CV, SPI, CPI, EAC) from IJ ma'am's slides, because EVM appeared in three of the five years, including both 2023-24 papers.

### The older format (2019-20 to 2021-22, any three of four)

In the older CSE 307 papers, ==Section A was the pattern section==: almost every set started with a 15–28 mark pattern question (Composite, Mediator, Decorator, Builder, Strategy, Factory, Singleton), and the leftover parts were project management (COCOMO, risk, CPM), which you skip. ==Section B was the testing / UML / process section==: a class diagram from a long text, EP and coverage test design, integration testing, code smells, Scrum and Kanban, plus security, DevOps and architecture questions, which you skip. The newer papers mix these two halves more freely, but the ingredients are the same.

---

## Part 2 — Paper by paper, set by set

### 2023-24 — CSE 213, May 2026 paper (Q1 and Q5 compulsory)

**Section A.**
**Q1 (compulsory):** (a) Factory Method for travel packages [15] ✅ [[AI-2 Creational Design Patterns#Factory Method]]; (b) ethical breaches of a security engineer [10] ✅ [[IJ-7 Software Ethics]]; (c) is the incremental model suitable for a mental health app [10] ✅ [[IJ-3 Process Models and Agile]].
**Q2:** (a) FinCorp reports with Composite + Decorator [20] ✅ [[IJ-1 Structural Design Patterns]]; (b) risks of cancelling vs launching an AI feature [15] ⏭.
**Q3:** EVM for SmartHome, then caching, sharding and CDN [35] ⏭ — the set to drop.
**Q4:** (a) five bad smells in Student/Scholarship, with refactored code [20] ✅ [[IJ-6 Refactoring and Code Smells]]; (b) code smell, technical debt and refactoring definitions ✅ plus proactive vs reactive risk ⏭ [15].

**Section B.**
**Q5 (compulsory):** (a) equivalence class testing for course registration [15] ✅ [[AI-10 Equivalence Partitioning and BVA]]; (b) Smart Home Hub, Mediator and Command [10] ✅ [[IJ-2 Behavioral Design Patterns]]; (c) writing a specification for an already-built product [10] ✅ [[IJ-8 Requirement Analysis]].
**Q6:** (a) JUnit test class for isLeapYear [15] ✅ [[IJ-4 Unit Testing and JUnit]]; (b) overload vs DoS [10] ⏭; (c) integration testing when the middle module is missing [10] ✅ [[AI-8 Software Testing Fundamentals]].
**Q7:** (a) performance testing plan [15] ✅ [[AI-8 Software Testing Fundamentals]]; (b) BVA for the LOW-power partition [10] ✅ [[AI-10 Equivalence Partitioning and BVA]]; (c) problems in a C login program [10] ✅ (answerable as code review, [[IJ-5 Code Reviews]]).
**Q8:** (a) Strategy inside Template Method for file parsing [15]; (b) Observer for news displays [10]; (c) State vs Strategy [10] — all ✅ [[IJ-2 Behavioral Design Patterns]].

### 2023-24 — CSE 213, Feb 2025 paper (Q1 and Q5 compulsory)

**Section A.**
**Q1 (compulsory):** (a) use case diagram with a misuse actor [7] ✅ [[AI-6 Use Case Diagram]]; (b) password security policy [14] ⏭; (c) test cases for the password policy [10] ✅ [[AI-10 Equivalence Partitioning and BVA]]; (d) assets, exposures, vulnerabilities [6] ⏭; (e) weaknesses of passwords, 2FA/3FA [8] ⏭.
**Q2:** (a) StockMarket with Observer, UML [6] and code [16]; (b) help system UML with Chain of Responsibility [8] — all ✅ [[IJ-2 Behavioral Design Patterns]].
**Q3:** (a) TDD and its benefits [12] ✅ [[IJ-4 Unit Testing and JUnit]]; (b) white-box test cases for FindMean [10] ✅ [[AI-9 Code Coverage and White-box Testing]]; (c) the principle of equivalence partitioning [8] ✅ [[AI-10 Equivalence Partitioning and BVA]].
**Q4:** security (CIA, encryption, residual risk, buffer overflow) ⏭ — the set to drop.

**Section B.**
**Q5 (compulsory):** (a) regional pizzas with Abstract Factory [15] ✅ [[AI-2 Creational Design Patterns#Abstract Factory]]; (b) one class acting as both Adapter and Facade [12] ✅ [[IJ-1 Structural Design Patterns]]; (c) why high test coverage matters [8] ✅ [[AI-9 Code Coverage and White-box Testing]].
**Q6:** (a) ethical breaches in a health app [8] ✅ and (b) "act consistently with the public interest" [7] ✅ [[IJ-7 Software Ethics]]; (c) EVM [20] ⏭.
**Q7:** AI feature risk, results portal overload, profiling ⏭.
**Q8:** (a) when Incremental beats Agile [8] ✅ and (b) manager vs leader [7] ✅ [[IJ-3 Process Models and Agile]]; (c) smells in DiscountCalculator / OrderProcessor, refactored [20] ✅ [[IJ-6 Refactoring and Code Smells]].

### 2022-23 — CSE 307, May 2024 paper (Q1 and Q5 compulsory)

**Section A.**
**Q1 (compulsory):** (a) zip code instead of city name with Adapter [15] ✅ [[IJ-1 Structural Design Patterns#Adapter Pattern]]; (b) test cases for income tax slabs [10] ✅ [[AI-10 Equivalence Partitioning and BVA]]; (c) internal vs external integration testing for a ride-sharing app [10] ✅ [[AI-8 Software Testing Fundamentals]].
**Q2:** (a) air traffic control with Mediator [15] ✅ [[IJ-2 Behavioral Design Patterns#Mediator Pattern]]; (b) issues found in code review, with examples [12] ✅ [[IJ-5 Code Reviews]]; (c) an example of ISP [8] ✅ [[AI-1 Design Principles (SOLID)]].
**Q3:** (a) HTML page Director and Builder [15] ✅ [[AI-2 Creational Design Patterns#Builder]]; (b) caching strategies [12] ⏭; (c) CI/CD [8] ⏭.
**Q4:** (a) alumni blog notifications with Observer [15] ✅ [[IJ-2 Behavioral Design Patterns#Observer Pattern]]; (b) class diagram for accounting software [12] ✅ [[AI-3 Class Diagram]]; (c) minimal dataset for condition coverage [8] ✅ [[AI-9 Code Coverage and White-box Testing]].

**Section B.**
**Q5 (compulsory):** (a) Shotgun Surgery, Parallel Inheritance Hierarchies, Refused Bequest, Feature Envy [15]; (b) three refactorings — Extract Variable, Replace Conditional with Polymorphism, Guard Clauses [20] — all ✅ [[IJ-6 Refactoring and Code Smells]].
**Q6:** (a) generic process model activities and Waterfall [10]; (b) Kanban card workload and lead time [10]; (c) Scrum sprint and the two backlogs [15] — all ✅ [[IJ-3 Process Models and Agile]].
**Q7:** risk strategies, EVM, critical path ⏭.
**Q8:** SQL injection, XSS, federated identity, encryption, performance bottlenecks ⏭.

### 2021-22 — CSE 307, May 2023 paper (any three of four)

**Section A.**
**Q1:** (a) use cases of Factory Method vs Abstract Factory vs Builder vs Bridge [16] ✅ [[AI-2 Creational Design Patterns]]; (b) rewrite the if/else `GetSuperHeroItem` to be readable and O(1) [13] ✅ [[AI-2 Creational Design Patterns]] (map-based factory); (c) parallel, plunge, pilot and phased implementation [6] ⚪.
**Q2:** (a) network packet layers adding headers, with Decorator [20] ✅ [[IJ-1 Structural Design Patterns#Decorator Pattern]]; (b) class diagram for a university [10] ✅ [[AI-3 Class Diagram]]; (c) functional vs non-functional requirements [5] ✅ [[IJ-8 Requirement Analysis]].
**Q3:** (a) restaurant set menus from three kitchens, with Builder [20] ✅ [[AI-2 Creational Design Patterns#Builder]]; (b) six types of testing [10] ✅ [[AI-8 Software Testing Fundamentals]]; (c) "a bug costs less to fix later in the SDLC" — agree? [5] ✅ [[IJ-8 Requirement Analysis]].
**Q4:** (a) identify the pattern in four situations — NuetFlix (Observer), jit (Command), BanglaPhone (Strategy), R2-D2 journal (Mediator) [20] ✅ [[IJ-2 Behavioral Design Patterns]] and [[00 Pattern Picker]]; (b) judge the quality of a requirement statement [10] ✅ [[IJ-8 Requirement Analysis]]; (c) five negative testing ideas for a web app [5] ✅ [[AI-10 Equivalence Partitioning and BVA]].

**Section B.**
**Q5:** (a) uncertainty and loss of a risk [10] ⏭; (b) the steps of a Scrum sprint [20] ✅ [[IJ-3 Process Models and Agile]]; (c) short, useful, up-to-date code documents [5] ⚪.
**Q6:** (a) how Incremental and Evolutionary fix Waterfall's problems [10] ✅ [[IJ-3 Process Models and Agile]]; (b) SPI, CPI, EAC [15] ⏭; (c) define code smell, with three examples [10] ✅ [[IJ-6 Refactoring and Code Smells]].
**Q7:** (a) why the industry shifted from traditional to agile [10] ✅ [[IJ-3 Process Models and Agile]]; (b) CPM, slack and critical path [20] ⏭; (c) "adding manpower to a late project makes it later" [5] ⚪.
**Q8:** (a) driver and navigator in pair programming [10] ✅ and (b) Kanban visualization [15] ✅ [[IJ-3 Process Models and Agile]]; (c) the people and process components of a project [10] ⚪.

### 2020-21 — CSE 307, Oct 2022 paper (any three of four)

**Section A.**
**Q1:** (a) burger shop meals built with three different patterns (Factory Method for pizzas, Decorator for extra cheese, Builder for the combo meal) [28] and (b) their relative advantages [7] — ✅ [[IJ-1 Structural Design Patterns]] and [[AI-2 Creational Design Patterns]].
**Q2:** (a) talk-time schemes decoupled from the UI with Factory Method [10] ✅ [[AI-2 Creational Design Patterns#Factory Method]]; (b) three sorting routines with Strategy [10] and (c) merit list for the highest grade with Strategy [15] ✅ [[IJ-2 Behavioral Design Patterns#Strategy Pattern]].
**Q3:** (a) employee hierarchy with direct and indirect subordinates, with Composite [15] ✅ [[IJ-1 Structural Design Patterns#Composite Pattern]]; (b) temperature dashboard with Observer [10] ✅ [[IJ-2 Behavioral Design Patterns#Observer Pattern]]; (c) COCOMO II [10] ⏭.
**Q4:** risks [10], team selection for a spell checker [15], build-vs-buy decision [10] — ⏭ the set to drop.

**Section B.**
**Q5:** (a) class diagram for a media agency [16] ✅ [[AI-3 Class Diagram]]; (b) EP test inputs for the release order cost [12] ✅ [[AI-10 Equivalence Partitioning and BVA]]; (c) non-repudiation [7] ⏭.
**Q6:** (a) microservice architecture [12] ⏭; (b) test execution for method, branch and condition coverage, plus qualities of good unit tests [15] ✅ [[AI-9 Code Coverage and White-box Testing]]; (c) issues found in code review [8] ✅ [[IJ-5 Code Reviews]].
**Q7:** (a) positive and negative testing for laptop requisition [10] ✅ [[AI-10 Equivalence Partitioning and BVA]]; (b) write-through vs write-around caching [16] ⏭; (c) data-centered architecture [9] ⏭.
**Q8:** (a) message queues and confidentiality [15] ⏭; (b) CI and containerization [12] ⏭; (c) smoke vs regression testing [8] ✅ [[AI-8 Software Testing Fundamentals]].

### 2019-20 — CSE 307, Sept 2021 paper (any three of four)

**Section A.**
**Q1:** (a) serial unique ID generators (userID, TxID) — Singleton [15] ✅ [[AI-2 Creational Design Patterns#Singleton]]; (b) sorting broker with Mediator [20] ✅ [[IJ-2 Behavioral Design Patterns#Mediator Pattern]].
**Q2:** (a) company hierarchy with Composite [20] ✅ [[IJ-1 Structural Design Patterns#Composite Pattern]]; (b) COCOMO effort [15] ⏭.
**Q3:** (a) GQM goal template and metrics for testability [20] ⚪; (b) limited budget — reviewers or testers? [15] ✅ [[IJ-5 Code Reviews]].
**Q4:** risks [20] and CPM network [15] ⏭ — the set to drop.

**Section B.**
**Q5:** (a) class diagram for hospital wards and teams [20] ✅ [[AI-3 Class Diagram]]; (b) integration testing requirements for an HRM module [15] ✅ [[AI-8 Software Testing Fundamentals]].
**Q6:** (a) code snippets showing Data Clumps and Refused Bequest [20] ✅ [[IJ-6 Refactoring and Code Smells]]; (b) CI steps and containerization [15] ⏭.
**Q7:** (a) test fixtures and a unit test for a grading system with BVA [20] ✅ [[IJ-4 Unit Testing and JUnit]]; (b) non-repudiation and integrity [15] ⏭.
**Q8:** (a) MVC login flow and microservices [20] ⏭; (b) load vs stress testing, and is code review black-box? [15] ✅ [[AI-8 Software Testing Fundamentals]].

---

## Part 3 — How often each topic appears

The count below is "in how many of the five years did this topic appear at least once". 2023-24 counts as one year even though it has two papers. Use it to decide what to revise first when time is short.

| Topic | Years (out of 5) | Usual size |
|---|---|---|
| Design patterns (any) | ==5 / 5==, 3–6 questions every paper | 10–28 marks, diagram + code |
| Code review | ==5 / 5== | 8–15 |
| Refactoring and code smells | ==4 / 5== | 10–35 |
| EP / BVA / ECT test design | ==4 / 5== | 8–15 |
| Testing types (performance, smoke, load, positive/negative) | ==4 / 5== | 5–15 |
| Class diagram from a scenario | 4 / 5 (not in 2023-24) | 10–20 |
| Process models and agile (Scrum, Kanban, incremental) | 3 / 5, but in ==every paper since 2021-22== | 8–20 |
| Observer · Mediator | 4 / 5 each | 10–20 |
| Strategy · Composite · Decorator · Factories · Builder | 3 / 5 each | 10–28 |
| JUnit / unit testing / TDD | 3 / 5 | 12–20 |
| Coverage and white-box | 3 / 5 | 8–15 |
| Integration testing (stubs/drivers) | 3 / 5 | 10–15 |
| Requirements | 2 / 5 | 5–10 |
| Ethics | 1 / 5, but ==in both 2023-24 papers== | 7–10 |
| Command · Adapter | 2 / 5 each | 10–15 |
| ⏭ Risk / EVM / CPM / COCOMO | 5 / 5 | 10–35 |
| ⏭ Security | 4 / 5 | 7–35 |

> [!tip] 🎯 TF angle — what the trend says about your paper
> The two newest papers (both 2023-24) show three shifts. ==Ethics is new and appeared in both==, so expect it again. ==Two-pattern combination questions are new== (Composite + Decorator, Strategy inside Template, Adapter + Facade, Mediator + Command), so practise explaining how two patterns fit together. ==Class diagrams from long text dropped out== of the 2023-24 papers, but use case diagrams appeared, so do not drop UML completely.

---

## Part 4 — What to do in the exam hall

**Before writing anything,** spend the first five minutes tagging each set in both sections with the same three marks used above: ✅ fully doable, half doable, or ⏭. In every paper above, the ✅ sets were enough to fill your choices in Section A. In Section B they were usually enough too, with 2022-23 as the one exception.

**Choosing in Section A:** the compulsory Q1 first, then ==the pattern set==, then whichever of the refactoring or testing set is cleaner. Leave the set that has EVM, caching or security in it.

**Choosing in Section B:** the compulsory Q5 first, then ==the testing set== or ==the process/agile set== (both are mostly theory you can write quickly), and the pure pattern set if one exists (as in May-2026 Q8). If every remaining set has a skipped part, choose the one where ==the skipped part carries the fewest marks== and write a short common-sense answer for that part. Partial marks are better than a blank.

**Inside a pattern answer,** follow [[00 IJ Ma'am's Exam Rules]]: justification first, then code, then diagram if time allows. For recognising the pattern quickly, use [[00 Pattern Picker]].
