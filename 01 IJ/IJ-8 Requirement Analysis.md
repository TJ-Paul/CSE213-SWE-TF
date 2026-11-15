# IJ-8 Software Requirement Analysis

This note covers how requirements are gathered, analysed, written down and checked: the four-stage analysis pipeline, elicitation methods, functional vs non-functional requirements, MoSCoW prioritisation, the qualities of a good requirement (and how to rewrite a vague one), the Requirements Traceability Matrix, and why fixing a requirement error late is so expensive. In the term final you get either a definition/difference question ("functional vs non-functional"), a **quality assessment** of a given requirement sentence, or a **process** question such as "the product was built without a specification — how would you prepare one?" (May-2026 Q5(c)).

**TF frequency:** May-2026 Q5(c) [10], 2021-22 Q2(c) [5], Q3(c) [5], Q4(b) [10].

📑 **See:** *[2] IJ mam / 9 - Software Requirement Analysis.pdf* (12 pages).

---

## 1. Why requirement analysis matters (📑 p.2)

==Poor requirement analysis is one of the major reasons of project failure.== It causes three kinds of damage. **Misaligned features**: the team builds the wrong features, which often forces total rewrites. **Architectural churn**: constant requirement changes break the code structure, introduce bugs and damage the architecture midway. **Resource drain**: mid-flight revisions cause missed deadlines, budget overruns and team burnout. Good analysis gives two benefits: ==cost reduction==, because fixing errors early costs much less than post-release hot-fixes, and ==stakeholder alignment==, because it establishes a single source of truth for everyone.

> [!important] 🔑 Memorize — The cost of late defects
> ==The later a defect is found in the SDLC, the more expensive it is to fix.== A requirement error found during requirement analysis costs only a document edit; found in design it costs redesign; found in coding it costs redesign + recode; found in testing it costs all that + retesting; found after release it costs all that + redeployment, customer support, data repair and reputation damage. Commonly quoted ratios are roughly ==1× (requirements) → 5× (design) → 10× (coding) → 20–50× (testing) → 100× or more (after release)==.

## 2. The analysis pipeline — four stages (📑 p.3)

> [!important] 🔑 Memorize — 4 stages
> ==Elicitation → Analysis & Refinement → Specification → Validation==

**Elicitation** means gathering raw user needs and domain constraints from stakeholders. **Analysis and refinement** means resolving conflicts between stakeholders, removing duplicates, and modelling the system behaviour (with use case diagrams, BPMN, class diagrams). **Specification** means documenting the requirements as precise, formal, measurable criteria — usually in a Software Requirements Specification (SRS). **Validation** means verifying the specification against stakeholder objectives: reviewing it with the stakeholders, checking with prototypes, and confirming every requirement is correct, complete and testable.

## 3. Elicitation methods (📑 p.4–6)

The primary methods are five. **One-on-one interviews** give in-depth qualitative insight from domain experts and key users; they are best for deep needs and domain rules, but watch out for interviewer bias and they do not scale to many users. **Quantitative surveys/questionnaires** gather structured data from a broad user base for statistical validation; they are best when there are many users, but answers can be shallow and response rates low. **Focus groups** are interactive sessions that uncover shared priorities and group consensus. **Co-design workshops** are joint sessions where stakeholders design solutions together; they are best for resolving conflicting stakeholders quickly, but dominant voices can take over and scheduling is hard. **Observation/field study** means watching users in their natural workflow; it reveals real workflows and workarounds that users never mention, but it is time-consuming and people behave differently when watched (observer effect). In addition, **document analysis** of existing forms, reports and manuals and **prototyping** are commonly used.

## 4. Functional vs Non-functional requirements (📑 p.7)

> [!important] 🔑 Memorize — The taxonomy
> A ==functional requirement== states ==WHAT the system must do== — a service, function or behaviour, i.e. how it reacts to particular inputs. A ==non-functional requirement== states ==HOW WELL the system performs== — a quality or constraint on the system as a whole, such as performance, security, usability, reliability, availability, scalability, maintainability or portability.

The slide uses a mobile-banking example. Functional: ==send money, check balance, cash-in via agent, view transaction history==. Non-functional: ==works offline, loads in 3 seconds on 3G, usable by low-literacy users, audit logging==.

The differences are easy to explain in paragraphs. Functional requirements describe features and are usually tied to a specific use case; if one is missing, a feature is missing. Non-functional requirements describe qualities and usually apply across the whole system; if one is not met, the system may still have all the features but be unusable (too slow, insecure, crashes). Functional requirements are verified by functional tests (does "transfer money" move the money?), while non-functional requirements are verified by non-functional tests such as performance, load, stress, usability and security testing. Functional requirements come mainly from users' tasks; non-functional requirements often come from business constraints, laws and the environment. Non-functional requirements are harder to state precisely, so they must be made measurable (see section 6).

More examples help in any question. For a university result system, functional: "the system shall let a teacher enter marks", "the system shall compute the CGPA", "a student shall view the grade sheet"; non-functional: "results page loads within 2 s for 10,000 concurrent users", "only the course teacher can edit marks", "system available 99.9% during result week", "grade sheet printable on A4".

## 5. Representing and prioritising requirements (📑 p.8–9)

Requirements are represented with ==use case diagrams== (actor interactions and system boundary — see [[AI-6 Use Case Diagram]]), ==BPMN and data-flow diagrams== (process and data flow — see [[AI-7 BPMN]]), and ==UML class diagrams== (domain entities and relationships — see [[AI-3 Class Diagram]]).

Because a team cannot do everything at once or give everything equal importance, requirements are prioritised. The slide's framework is ==MoSCoW==: **Must have** — non-negotiable core functionality required for release; **Should have** — high-value features that have a workaround if omitted; **Could have** — desirable enhancements included only if resources permit; **Won't have (this time)** — out of scope for the current cycle.

## 6. Anatomy of an effective requirement (📑 p.10)

> [!important] 🔑 Memorize — Six qualities of a good requirement
> ==Unambiguous · Verifiable (testable) · Complete · Consistent · Measurable · Feasible==

A requirement is **unambiguous** when it has only one interpretation. It is **verifiable/testable** when a test can prove it is met. It is **complete** when it says everything needed: who, what, when, under which conditions, and what happens on failure. It is **consistent** when it does not contradict other requirements. It is **measurable** when it uses numbers and units instead of words like "fast" or "easy". It is **feasible** when it can be implemented with the available technology, time and budget.

The slide's example shows the job. The weak requirement *"The app should be fast and easy to use for rural users."* is vague, not measurable and not testable. The rewritten version is: =="A balance check completes in ≤ 3 s on a 3G link for 95% of requests; 8 of 10 first-time users send money unaided in a pilot test."== Your task as an analyst is always to ==translate ambiguous, vague user requirements into clear, measurable ones==.

> [!tip] 🎯 TF angle — assessing a requirement sentence
> Go through the six qualities one by one in a paragraph, quoting the problem words ("fixed time" — which time? "update" — of what? "perform action" — which actions?). Then write an improved version with numbers, actors, triggers and failure behaviour. This exact approach solves 2021-22 Q4(b).

## 7. Requirements Traceability Matrix (📑 p.11)

An RTM is a table that links every requirement to its origin and to the design elements, code and test cases that implement and verify it. It provides ==bi-directional tracing== (business goals forward to test cases, and test cases backward to their origin), supports ==impact analysis== (before approving a change you can see what it affects), and ensures ==verification coverage== (no orphan features without a requirement, and no requirement without a test).

## 8. Preparing a specification for a system that was built without one

This is the May-2026 Q5(c) situation: the product exists, but nothing is written. You must "reverse-engineer" the requirements and then run the normal pipeline. Explain it as a sequence of activities in paragraphs.

First, **recover the current behaviour** from the existing artefacts: explore the running system screen by screen, read the source code, database schema, configuration, logs, bug tracker, commit history, help pages and any user manuals, and record every feature as a draft functional requirement. Second, **elicit from people**: interview the developers (who know what they built and why), the product owner/management (business goals), and real users (observe them, survey them) to find what they actually need, which workarounds they use, and which non-functional expectations exist (speed, security, availability). Third, **analyse and refine**: separate "what the system does" from "what it should do", resolve conflicts between stakeholders, mark gaps and defects, model the system with use case diagrams, class diagrams and BPMN, and prioritise with MoSCoW. Fourth, **specify**: write an SRS with sections for purpose and scope, stakeholders and users, functional requirements (numbered, one per statement, written as "The system shall…"), non-functional requirements made measurable, constraints and assumptions, and the models; every requirement should satisfy the six qualities. Fifth, **validate**: review the SRS with all stakeholders, check each requirement against the running system with test cases, and get formal sign-off so it becomes the agreed baseline. Finally, **maintain it**: create an RTM linking requirements to code and tests, put the SRS under version control, and use a change-control process so future reviews and improvements are made against this reference.

---

## TF questions on this topic

> [!example] ✍️ Worked TF question — 2021-22 Q2(c) [5] — Differences between functional and non-functional requirements
> A functional requirement describes **what** the system must do — a specific service or behaviour in response to inputs, for example "the system shall allow a student to register for a course" or "the system shall send money to another account". A non-functional requirement describes **how well** the system must do it — a quality attribute or constraint, for example "registration shall complete within 2 seconds for 5,000 concurrent users" or "passwords shall be stored encrypted". Functional requirements are usually tied to particular features/use cases, whereas non-functional requirements usually apply to the whole system. If a functional requirement is missing, a feature is missing; if a non-functional requirement is not met, the system may become unusable even with all features. Functional requirements are checked by functional testing, while non-functional ones are checked by performance, load, stress, usability and security testing, and they must be stated measurably to be testable.

> [!example] ✍️ Worked TF question — 2021-22 Q3(c) [5] — "It incurs less cost to fix a bug if we find it in the later stages of SDLC" — agree?
> No, I disagree; the opposite is true. The cost of fixing a bug ==increases sharply the later it is found==. A requirement mistake found during requirement analysis only needs a document correction. If the same mistake is found during design, the design must be redone; during coding, the design and code must be redone; during testing, design, code and tests must all be redone; and after release, we additionally pay for patches, redeployment, data correction, customer support and lost reputation. Studies commonly show a defect costs around 10 times more in coding and up to 100 times more after release than in requirements. This is exactly why requirement analysis, early reviews and early testing (as in incremental/agile models) are emphasised: "fixing errors early costs much less than post-release hot-fixes."

> [!example] ✍️ Worked TF question — 2021-22 Q4(b) [10] — Assess: "The software should provide update notification after a fixed time. Users should be able to perform action based on the notification."
> **Unambiguous?** No. "Update" is unclear — software update, data update, or status update? "Fixed time" is unclear — a fixed interval (every 24 hours?) or a fixed clock time (9 AM)? "Perform action" does not say which actions.
> **Measurable?** No. There is no number for the interval, the delivery delay, or how many users should receive it.
> **Verifiable/testable?** No. Because the time and the actions are unspecified, no test can decide pass or fail.
> **Complete?** No. It does not say who receives the notification, through which channel (push, email, in-app), what the notification contains, what happens if the user is offline, or whether the user can ignore/postpone it.
> **Consistent?** It cannot be checked against other requirements, because it is vague; e.g. it may conflict with a "do not disturb" requirement.
> **Feasible?** Probably feasible technically, but feasibility cannot be confirmed without the details.
> The word "should" also makes it sound optional; requirements are usually written with "shall".
> **Improved requirement:** "Every 24 hours at 09:00 local time, the system shall check for a new app version. If a newer version exists, the system shall show an in-app notification to all logged-in users within 1 minute, stating the version number and its changes. The notification shall offer three actions — *Update now*, *Remind me in 24 hours*, *Skip this version*. If the user is offline, the notification shall be shown at the next login."

---

## Same type in the papers you will solve last

May-2026 paper Q5(c) — a startup built the product without a specification; explain how you would prepare a proper specification. Feb-2025 paper Q1 also expects requirement thinking but its parts are mostly security (skipped scope). See [[TF 2023-24 (May 2026 paper)]].
