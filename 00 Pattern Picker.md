# 🧩 Pattern Picker — recognise the design pattern in one minute

Most design-pattern marks are lost in the first minute, when the student picks the wrong pattern and then writes perfect code for it. This note trains that first minute. The first half explains, pattern by pattern, which **signal words** in a scenario point to which pattern. The second half is a **drill**: every pattern scenario from the last five term finals and the class test, written as one line, with the answer hidden in a collapsible box. Read the first half once. Then do the drill again and again until you get every answer right without opening the boxes.

Read this note after you have finished [[IJ-1 Structural Design Patterns]], [[IJ-2 Behavioral Design Patterns]] and [[AI-2 Creational Design Patterns]], because it assumes you already know what each pattern looks like.

---

## Step 1 — First decide the family

Before thinking about a specific pattern, ask what the scenario is mainly worried about. **If it is worried about how objects are created** (who calls `new`, hiding concrete classes, building a complicated object step by step, or allowing only one instance), the answer is a ==creational== pattern. **If it is worried about how objects are put together** (wrapping, trees, making two incompatible interfaces talk, splitting two hierarchies), the answer is a ==structural== pattern. **If it is worried about how objects talk and behave** (notifications, a central coordinator, interchangeable algorithms, requests stored as objects, behaviour that changes with state, passing a request along), the answer is a ==behavioral== pattern. This one question cuts the 15 candidate patterns down to four or five.

---

## Step 2 — Signal words for each pattern

### Creational

**Factory Method.** Choose it when the scenario says that the client ==should not construct a concrete class directly==, that objects should be created through a ==centralized creation component==, and that ==new types must be added without modifying existing code==. The key idea is one product hierarchy (packages, shapes, payment processors, transports) and a creator that decides which concrete product to make. If the question only says "hide the `new`", a simple factory with a `switch` is enough. If it also says "add new types without modifying existing code", you should mention the Open/Closed Principle and use creator subclasses or a registration map. → [[AI-2 Creational Design Patterns#Factory Method]]

**Abstract Factory.** Choose it when there are ==families of related products that must match each other==, such as Italian crust, sauce and toppings versus American ones, Modern versus Victorian furniture, Windows versus Mac buttons and checkboxes, or Civic versus Accord engines and transmissions. The signal is two dimensions: several product *kinds* and several *variants/regions/themes*, where mixing variants is wrong. → [[AI-2 Creational Design Patterns#Abstract Factory]]

**Builder.** Choose it when a ==complex object is assembled step by step from parts==, when the same construction process should produce different representations, or when a "director" or "order taker" tells a builder which parts to add and finally asks for the product. Signal words are *set menu, meal, assemble, final assembly, step by step, HTML page with title, heading and lines, a computer with chosen parts*. → [[AI-2 Creational Design Patterns#Builder]]

**Singleton.** Choose it when there must be ==exactly one instance== with a global access point, for example a database connection manager, a logger, a configuration object, or an ==ID generator that must never produce duplicates and counts serially from 1==. → [[AI-2 Creational Design Patterns#Singleton]]

### Structural

**Decorator.** Choose it when you must ==add responsibilities or extras to an object dynamically, possibly several at once and possibly the same one twice==, and each extra changes the result (price, description, message). Signal words are *add-ons, condiments, toppings, extra cheese, optional sections that may or may not be included, layers that each add a header, wrap*. The classic tell is the ==subclass explosion== problem: you would otherwise need a class for every combination. → [[IJ-1 Structural Design Patterns#Decorator Pattern]]

**Composite.** Choose it when the data is a ==tree with part-whole hierarchy==, and the client must treat a single item and a group of items the same way. Signal words are *hierarchy, subordinates, direct and indirect, menus and submenus, city → state → country → global, account with children and leaf accounts, the level is not fixed*. Operations such as "show all employees under X" or "aggregate expenditure from all subunits" are recursive calls down the tree. → [[IJ-1 Structural Design Patterns#Composite Pattern]]

**Adapter.** Choose it when an ==existing class has the wrong interface== for what the client expects, and you cannot or should not change either side. Signal words are *the client now wants to pass zipcode but the service takes city name, vendor class, legacy, third-party library, Turkey must behave like a Duck, convert*. → [[IJ-1 Structural Design Patterns#Adapter Pattern]]

**Bridge.** Choose it when a class varies along ==two independent dimensions== (shape × color, notification type × sending channel, GUI × operating system) and inheritance would create every combination. You split the class into an abstraction hierarchy and an implementation hierarchy, and the abstraction *has-a* implementation. → [[IJ-1 Structural Design Patterns#Bridge Pattern]]

**Facade.** Choose it when the client should use ==one simple interface in front of a complicated subsystem== made of many classes, for example one `placeOrder()` method that internally calls inventory, payment and shipping. → [[IJ-1 Structural Design Patterns#Facade Pattern]]

### Behavioral

**Observer.** Choose it for a ==one-to-many "publish–subscribe" relationship==: when one object changes, all registered objects must be notified automatically, and objects can register or unregister at any time. Signal words are *subscribe, register, notify all, displays updated instantly, followers, group members, dashboard updates when new data arrives, recommend to users interested in the genre*. → [[IJ-2 Behavioral Design Patterns#Observer Pattern]]

**Mediator.** Choose it when ==many objects would otherwise talk to each other directly== (many-to-many), and you want all communication to go through one central object. Signal words are *control tower, hub, broker, coordinates, the objects need not interact directly, no dependency between them, anonymous communication through an internal team*. → [[IJ-2 Behavioral Design Patterns#Mediator Pattern]]

**Strategy.** Choose it when there is a ==family of interchangeable algorithms== and the client or the context should be able to ==swap the algorithm at runtime== without changing the code that uses it. Signal words are *selection/insertion/quick sort, grading scheme, different implementations chosen by user count, interchangeable extraction logic, pay by card or cash*. → [[IJ-2 Behavioral Design Patterns#Strategy Pattern]]

**Template Method.** Choose it when several classes share ==the same fixed skeleton of steps== but some steps differ (coffee and tea, open → extract → close). The skeleton is a `final` method in an abstract class, and subclasses override only the varying steps. → [[IJ-2 Behavioral Design Patterns#Template Method Pattern]]

**Command.** Choose it when ==a request must become an object==, so it can be queued, logged, scheduled, replayed, or undone. Signal words are *undo/redo, queue of orders, record and replay, macro, an agent who takes orders and places them later, commit locally and push later, a remote control*. → [[IJ-2 Behavioral Design Patterns#Command Pattern]]

**State.** Choose it when ==an object's behaviour depends on its current state== and the state changes as a result of actions, so that the same method (insert coin, publish document) does different things in different states. Signal words are *states, transitions, when in X state, gumball machine, document draft/moderation/published, vending, traffic light*. → [[IJ-2 Behavioral Design Patterns#State Pattern]]

**Chain of Responsibility.** Choose it when ==a request is passed along a chain of handlers==, and each handler either handles it or forwards it to its successor. Signal words are *successor, forward the request, help handler, escalate to a higher level, approval by clerk → manager → director*. → [[IJ-2 Behavioral Design Patterns#Chain of Responsibility Pattern]]

---

## Step 3 — Tie-breakers for the pairs that confuse everyone

**Observer or Mediator?** If one object broadcasts its change to many listeners and the listeners do not talk back to each other, it is Observer. If many peers need to coordinate with each other and you put a central object in the middle so that none of them knows the others, it is Mediator. A smart-home hub that receives a motion event and decides which light, alarm or notification to trigger is Mediator, because the hub contains the coordination logic.

**Strategy or State?** Both put behaviour in separate objects. In Strategy, the *client chooses* the algorithm and the strategies do not know about each other. In State, the *object itself switches* its state as a result of its own actions, and concrete states usually know the next state.

**Strategy or Template Method?** Template Method uses ==inheritance== and fixes the steps at compile time (class level). Strategy uses ==composition== and lets you change the behaviour at runtime (object level).

**Decorator or Composite?** Both use recursive composition. A decorator wraps exactly one component and adds behaviour to it. A composite holds many children and represents a part-whole tree.

**Adapter or Facade?** An adapter makes one existing interface look like a different interface that the client already expects. A facade invents a new, simpler interface in front of many classes. One class can do both jobs at the same time, which is exactly what the Feb-2025 paper asks.

**Factory Method, Abstract Factory or Builder?** Factory Method creates one product and lets subclasses or a registry decide its concrete class. Abstract Factory creates a whole family of matching products. Builder creates one complex product in several steps.

**Command or Mediator?** Command creates a one-way link from a sender to a receiver, and the request itself is an object. Mediator removes the direct links between many senders and receivers.

---

## Step 4 — The drill

Cover the answers and say the pattern aloud with a one-sentence reason before opening each box. Scenarios are listed newest paper first.

### From the papers you will solve last (just name the pattern; full solutions are in `03 TF Solves`)

> [!question]- May-2026 Q1(a): Travel packages (Adventure, Regular); the client must not construct concrete classes; creation goes through a centralized creation component; new package types must be added without modifying existing code.
> **Factory Method.** There is one product hierarchy, a central creator, and an Open/Closed requirement. Mention that a simple factory with `if/else` would break OCP, so use creator subclasses or a registry.

> [!question]- May-2026 Q2(a): FinCorp expenditure reports at city, state, country and global level, with optional extra sections (tax, investment, compliance) that may be added in any combination.
> **Composite + Decorator.** The office hierarchy is a part-whole tree, so use Composite and aggregate recursively. The optional report sections are add-ons wrapped around the core report, so use Decorator.

> [!question]- May-2026 Q5(b)(i): A smart home hub; a motion-sensor event triggers coordinated actions on lights, alarms and notifications.
> **Mediator.** The hub is the central coordinator, so the devices never reference each other.

> [!question]- May-2026 Q5(b)(ii): Record, queue and later replay sensor-triggered actions.
> **Command.** Each action becomes an object that can be stored in a queue or log and executed again.

> [!question]- May-2026 Q8(a): A Template-based DataParser (open → extract → close) needs a new subclass for every file format; make the extraction logic interchangeable at runtime.
> **Strategy inside Template Method.** Keep `parse()` as the final template, and let `extract()` delegate to an `ExtractionStrategy` field that can be swapped.

> [!question]- May-2026 Q8(b): A news agency; Website, Mobile App and Office Billboard update instantly when a breaking headline is published.
> **Observer.** One subject (the news agency) and many displays that subscribe and get notified.

> [!question]- Feb-2025 Q2(a): StockGrabber notifies all registered StockObservers only when a price actually changes; each observer has an auto-generated ID.
> **Observer.** StockGrabber is the subject and StockObserver is the observer.

> [!question]- Feb-2025 Q2(b): HelpHandler with a successor; Button handles help if it has a topic, otherwise forwards to Dialog, then to Application.
> **Chain of Responsibility.** The request travels along the chain of successors until one handler answers it.

> [!question]- Feb-2025 Q5(a): Pizza delivery in Italy and America; crust and toppings differ by region; easy to add new countries.
> **Abstract Factory.** Each region is a family of matching ingredients, and adding a country means adding one new factory.

> [!question]- Feb-2025 Q5(b): One class that acts both as an Adapter and as a Facade.
> **Adapter + Facade in one class.** It implements the interface that the client expects (adapter role) and internally coordinates several subsystem classes behind one simple method (facade role).

> [!question]- CSE307 2022-23 Q1(a): A temperature service takes a city name; the client now wants to pass a zipcode.
> **Adapter.** The adapter takes a zipcode, converts it to a city, and calls the existing service.

> [!question]- CSE307 2022-23 Q2(a): Air traffic controller; flights do not interact directly.
> **Mediator.** This is the textbook control-tower example from the slides.

> [!question]- CSE307 2022-23 Q3(a): HTMLPageDirector tells HTMLPageBuilder the title, heading and lines, then asks it for the final page.
> **Builder.** It has a director, a builder, a step-by-step assembly and a final product.

> [!question]- CSE307 2022-23 Q4(a): BUET alumni register to a blog and get notified when a new article is posted.
> **Observer.**

> [!question]- CSE307 2022-23 Q4(b): An Account may have children; leaf accounts hold transactions; an account with children or transactions cannot be deleted.
> **Class diagram with a Composite-style self-association** (Account contains child Accounts). The question asks for a class diagram, not code.

### From the papers you study inside the concept notes

> [!question]- 2021-22 Q1(b): The `GetSuperHeroItem` if/else chain must become readable and constant-time.
> **A map-based factory or registry** (`Map<String, SuperHeroItem>`), which gives O(1) lookup. → [[AI-2 Creational Design Patterns]]

> [!question]- 2021-22 Q2(a): A packet passes through Application, Transport, Network, Data-link and Physical layers; each layer adds a header (and one adds a trailer) and increases the length.
> **Decorator.** Each layer wraps the packet and adds its own header to the message and to the length.

> [!question]- 2021-22 Q3(a): A restaurant has four set menus; three kitchens prepare rice, main dishes and fried items; the order is assembled and delivered.
> **Builder.** Each set menu is built step by step from parts made by the kitchens, and a director assembles the exact items.

> [!question]- 2021-22 Q4(a)(i): NuetFlix; recommend a new movie to users interested in its genre.
> **Observer.** Each genre is a subject, and users subscribe to the genres they like.

> [!question]- 2021-22 Q4(a)(ii): jit with kommit, pussh and stashh.
> **Command.** Commits are request objects stored locally, executed later (push), and can be discarded (stash).

> [!question]- 2021-22 Q4(a)(iii): BanglaPhone switches between a stable-costly and a fast-cheap implementation based on the current user count.
> **Strategy.** The two implementations are interchangeable algorithms chosen at runtime. Bridge is an acceptable alternative if you argue two hierarchies.

> [!question]- 2021-22 Q4(a)(iv): R2-D2 journal; authors and reviewers never know each other; all communication goes through an internal team.
> **Mediator.**

> [!question]- 2020-21 Q1(a): Burger shop meals with pizza, extra cheese, drinks and appetizers; build classes using three different patterns.
> **Decorator** (extra cheese and drinks as add-ons that change the price), **Builder** (assemble a meal step by step), and **Factory Method / Abstract Factory** (create the pizza and drink objects).

> [!question]- 2020-21 Q2(a): Talk-time schemes are added frequently; decouple the UI programmers from the scheme classes.
> **Factory Method** (the UI asks a factory for a `Scheme` by name and never calls `new` on a concrete scheme).

> [!question]- 2020-21 Q2(b): Selection, insertion and quick sort routines.
> **Strategy.**

> [!question]- 2020-21 Q2(c): Student IDs and marks; produce a merit list using a grading scheme.
> **Strategy** for the grading scheme (it can be swapped without touching the merit-list code).

> [!question]- 2020-21 Q3(a): Employees with subordinates at any depth; list all direct and indirect subordinates.
> **Composite.**

> [!question]- 2020-21 Q3(b): A dashboard of maximum and average temperature updates when the day's temperature is entered.
> **Observer.**

> [!question]- 2019-20 Q1(a): Serial, never-duplicate identifiers (userID, district, qualification, TxID) starting from 1.
> **Singleton** (one generator instance per identifier type, so the counter is never duplicated).

> [!question]- 2019-20 Q1(b): A central broker forwards sort requests to three sort servers and queues simultaneous requests.
> **Mediator.** The question names it explicitly.

> [!question]- 2019-20 Q2(a): Managing Director → Managers → Developers, Executives and Officers; show all employees under any employee.
> **Composite.**

> [!question]- CT (a): Distances between cities change; one view shows kilometers and another shows miles.
> **Observer.** The graph is the subject, and the two views are observers.

> [!question]- CT (b): A client creates buy/sell orders; an agent queues them and places them on the StockTrade system.
> **Command.** Orders are command objects, the agent is the invoker with a queue, and StockTrade is the receiver.

> [!question]- CT (c): Users join and leave groups; all members are notified of new posts and comments.
> **Observer.**

---

## Step 5 — What to write once you know the pattern

Always open with ==one paragraph of identification and justification== that quotes two or three exact phrases from the scenario and maps each one to a role of the pattern. For example: "The ATC is the *mediator*, the flights are *colleagues*, and since flights 'need not interact directly', all messages go through the mediator." Then draw the class diagram with the real class names from the question and write the code. Finish with a short `main` that reproduces the scenario. Do not leave any role of the pattern unnamed, because the examiner checks that each role exists.
