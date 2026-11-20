# 🏠 CSE 213 Term Final — Start Here

This vault is a complete study path for the CSE 213 (Software Engineering) term final. It is built around one goal: **after finishing these notes you should be able to solve any in-scope question from the 2023-24, 2022-23, 2021-22, 2020-21 and 2019-20 papers by yourself.** Every concept note teaches the topic from the slides, tells you which slide page to open for the original diagram, and ends with full exam-style solutions of the older papers' questions on that topic. The two newest papers are solved separately in `03 TF Solves`. Read those last, as a final self-check.

---

## How to read this vault

Go through the notes **in the order below**. IJ ma'am's part comes first and AI sir's part comes second, as you asked. Inside each note, read the explanation first, then look at the slide pages it points to (📑 **See:** lines), then try the worked TF questions at the bottom *before* reading the solutions. When you reach the TF Solves folder, attempt every question on paper first and only then compare.

The notes use a few colored boxes so the important things jump out at you. A **🔑 Memorize** box contains a definition, rule or formula that you should be able to write word for word. A **🎯 TF angle** box tells you how the topic is asked in the exam and what earns the marks. A **⚠️ Common mistake** box warns you about two things students usually mix up. A **✍️ Worked TF question** box is a full solution of a previous-year question. Text that is ==highlighted like this== is a keyword or a scoring point that you must not forget.

---

## 📚 Study order

### Part 1 — IJ ma'am (folder `01 IJ`)

1. [[IJ-1 Structural Design Patterns]] — Decorator, Composite, Adapter, Bridge, Facade. ⭐ Very high marks.
2. [[IJ-2 Behavioral Design Patterns]] — Strategy, Template Method, Observer, Mediator, Command, State, Chain of Responsibility. ⭐ The single most important note.
3. [[IJ-3 Process Models and Agile]] — Waterfall, Incremental, Prototyping, Spiral, XP, Scrum, Kanban.
4. [[IJ-4 Unit Testing and JUnit]] — JUnit test classes, fixtures, assertions, TDD.
5. [[IJ-5 Code Reviews]] — Review workflow, issues found in reviews, best practices.
6. [[IJ-6 Refactoring and Code Smells]] — Smells, refactoring techniques, technical debt. ⭐ A 20-mark question appears almost every year.
7. [[IJ-7 Software Ethics]] — IEEE/ACM principles and how to find ethical breaches in a scenario.
8. [[IJ-8 Requirement Analysis]] — Functional vs non-functional, good requirements, specification.

### Part 2 — AI sir (folder `02 AI`)

1. [[AI-1 Design Principles (SOLID)]] — Encapsulation, composition over inheritance, SOLID.
2. [[AI-2 Creational Design Patterns]] — Factory Method, Abstract Factory, Singleton, Builder. ⭐ Very high marks.
3. [[AI-3 Class Diagram]] — Notation and drawing a class diagram from a long scenario.
4. [[AI-4 State Diagram]]
5. [[AI-5 Sequence and Collaboration Diagram]]
6. [[AI-6 Use Case Diagram]]
7. [[AI-7 BPMN]]
8. [[AI-8 Software Testing Fundamentals]] — Testing types, integration strategies, performance testing.
9. [[AI-9 Code Coverage and White-box Testing]] — Statement, branch, condition coverage, basis paths.
10. [[AI-10 Equivalence Partitioning and BVA]] — EP, weak/strong ECT, BVA, positive/negative testing.

### Part 3 — Exam tools

[[00 Question Analysis]] breaks down all seven papers from the last five years set by set: what the compulsory set usually contains, which set in each section is always a pattern set, which one is always a skipped topic you can drop, and how often every topic appears. Read it before you start the TF solves so you know the shape of the paper.

[[00 IJ Ma'am's Exam Rules]] turns IJ ma'am's own marking advice into a routine: justify every pattern (a wrong pattern with a good justification still gets partial marks), code before diagram when time is short, comments for repetitive parts, a Java-principles checklist, and how to put a method's definition on a diagram. Read it before the TF solves and again on exam morning.

[[00 Pattern Picker]] teaches you to read a long scenario and recognise the design pattern within a minute. It has a self-test drill made from every pattern scenario in the last five papers. Do it after finishing both parts.

[[99 Last Night Memorize Sheet]] collects every definition, formula and notation you must reproduce exactly. Read it the night before and on the morning of the exam.

### Part 4 — Final check (folder `03 TF Solves`)

These are the complete solutions of the newest papers. You should be able to solve them yourself by now. Use them to check your answers.

1. [[TF 2023-24 (May 2026 paper)]] — the newest CSE 213 paper (dated 10/05/2026).
2. [[TF 2023-24 (Feb 2025 paper)]] — the other CSE 213 paper with the 2023-2024 header (dated 09/02/2025).
3. [[TF 2022-23 (CSE307 May 2024)]] — the last paper of the old CSE 307 course, which had the same syllabus.
4. [[AI Sir Diagram Questions (CSE 325)]] — every use case, class, sequence, collaboration and state diagram question from the seniors' CSE 325 papers (2017-18 to 2023-24), with solutions. Do these after AI-3 to AI-6.

---

## 🎯 What the exam actually asks (from the last five papers)

The papers have two sections of 105 marks each. In the newer CSE 213 format, the first question of each section is mandatory and you choose two from the remaining three. In the older CSE 307 format, you choose any three of four. Every question has two or three parts, and each part is worth 5 to 20 marks.

**Design patterns are the backbone of the paper.** Every single paper has between three and six pattern questions. They are usually worth 15 to 20 marks each, and a full answer needs four things: the pattern name, a justification, a UML class diagram and Java code. The most frequent patterns are ==Observer, Mediator, Composite, Decorator, Factory Method / Abstract Factory, Builder, Strategy, Command and Adapter==. Comparison questions are also common, such as State vs Strategy, Strategy vs Template, Mediator vs Observer, and Factory Method vs Abstract Factory vs Builder vs Bridge. If you can do all of these perfectly, you have already secured close to half of the paper.

**Testing is the second backbone.** Expect equivalence partitioning with boundary values (tax slabs, grading, pump power levels, course registration), weak versus strong equivalence class testing, a full JUnit test class, coverage-based test design (condition, branch, white-box test cases with a control-flow graph), integration testing strategies with stubs and drivers, performance testing types, and positive/negative testing ideas.

**Refactoring is asked as a 15 to 20-mark code question** in nearly every paper. You are given a messy class and asked to name the smells and write the refactored code. Short definitions of smells such as Shotgun Surgery, Refused Bequest, Feature Envy, Data Clumps and Parallel Inheritance Hierarchies also appear.

**Process models and agile** come as scenario questions ("is the incremental model suitable here, or would another model be better?") and as theory questions on scrum sprints, backlogs and kanban. **Ethics** appears as a "find the ethical breaches in this scenario" question. **Requirements** appear as functional vs non-functional, judging the quality of a requirement statement, or writing a specification for an existing system. **UML diagrams** (class diagrams from a long text, and use case diagrams) appear regularly in the older papers and in the Feb-2025 paper.

> [!note] ⏭ Topics you chose to skip
> Security (CIA, encryption, SQL injection/XSS theory, risk exposure, 2FA), project scheduling (EVM, CPM, COCOMO), risk management, performance optimization (caching, sharding, CDN, profiling), DevOps/CI-CD and software architectures are **not taught** in this vault. In the solve files, every question on these topics is marked with a ⏭ Skipped box. Each solve file begins with a "What to attempt" paragraph that tells you which optional questions to choose so that you avoid them. Be aware that in some papers (for example CSE307 2022-23 Section B) you cannot avoid all of them, because one of your three Section B answers must come from Q7 or Q8.

---

## 🧭 Exam-hall strategy

Spend the first five minutes reading the whole section and ticking the questions whose patterns or techniques you recognise immediately. For a design-pattern question, always write it in four blocks in this order: **(1)** the pattern name with a two- or three-sentence justification that quotes the keywords from the scenario, **(2)** the class diagram, **(3)** the code, **(4)** a few lines of client/main code that show it working. Examiners give marks for every block separately, so write all four when time allows. ==If you are short of time, IJ ma'am said the code gets priority over the diagram==: write the justification and the code first, then add a rough diagram only if time is left. Her full marking rules are in [[00 IJ Ma'am's Exam Rules]]. For testing questions, always state your partitions or conditions first and then list the test cases with input and expected output. A test case without an expected output earns almost nothing.
