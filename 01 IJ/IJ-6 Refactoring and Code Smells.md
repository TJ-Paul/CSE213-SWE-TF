# IJ-6 Refactoring and Code Smells

This note teaches you to spot **bad smells** in code and remove them with named **refactoring techniques**, writing before/after Java code. This is one of the highest-scoring topics in recent papers: every recent paper gives a messy class (Student/Scholarship, DiscountCalculator/OrderProcessor, renderBanner/getSalary/getPayAmount) and asks you to ==identify the smells, name the refactoring, and write the refactored code==. You also get definition questions (code smell, refactoring, technical debt) and "define these smells with code" questions (Shotgun Surgery, Parallel Inheritance Hierarchies, Refused Bequest, Feature Envy, Data Clumps).

**TF frequency:** May-2026 Q4(a) [20] + Q4(b), Feb-2025 Q8(c) [20], CSE307 2022-23 Q5(a)(b) [35], 2021-22 Q6(c), 2019-20 Q6(a). Extremely high — practise until you can do it fast.

📑 **See:** *[2] IJ mam / 7 - Refactoring.pdf* (48 pages).

---

## 1. Definitions

> [!important] 🔑 Memorize — Refactoring (📑 p.2, p.8)
> ==Refactoring is the process of changing a software system in such a way that the external behaviour of the system does not change, but its internal structure is improved.== It is "improving the design after it has been written".
> Fowler's definitions: **Refactoring (noun)** — ==a change made to the internal structure of software to make it easier to understand and cheaper to modify without changing its observable behaviour==. **Refactoring (verb)** — ==to restructure software by applying a series of refactorings without changing its observable behaviour==.

> [!important] 🔑 Memorize — Code smell (📑 p.14)
> ==A code smell (bad smell) is a surface symptom in the source code that indicates a deeper problem in the design.== The code still works, but the smell shows it is hard to understand, change or extend, and it is a place "ripe" for refactoring. Smells are found by reading the code or by tools such as Codegrip, Checkstyle, PMD, FindBugs and SonarQube.

> [!important] 🔑 Memorize — Technical debt (not in slides, asked May-2026 Q4(b))
> ==Technical debt is the implied future cost of rework caused by choosing a quick, easy (but poor) solution now instead of a better approach that would take longer.== Like financial debt, it accumulates "interest": every shortcut (duplicated code, missing tests, hard-coded values, skipped design) makes each future change slower and riskier. Code smells are the visible signs of technical debt, and ==refactoring is how you pay the debt back==.

The relation of the three is simple and worth writing in one sentence in an exam: *technical debt is the accumulated cost of poor design decisions, code smells are the symptoms through which we detect that debt, and refactoring is the disciplined process that removes the smells and repays the debt without changing behaviour.*

Refactoring is different from **performance optimization**: both keep functionality the same and change only internal structure, but refactoring makes code easier to understand, whereas optimisation often makes code harder to understand (but faster) (📑 p.9).

## 2. Why, when, and how safely

**Why refactor (📑 p.11)?** Without refactoring, the design ==decays== as people make changes. Refactoring makes software easier to understand (structure improves, duplication is removed), ==helps you find bugs== because you understand the code deeply while restructuring it, and ==helps you program faster== because a good design enables progress. Code size often shrinks and confusing structures become simple (📑 p.6).

**When to refactor (📑 p.12)?** Follow ==the Rule of Three: "three strikes and you refactor"== — the first time you write something, just do it; the second time you duplicate it, wince; the third time, refactor. Also refactor ==when adding a function== (before, to make adding it easy, or after, to clean up), ==when fixing a bug==, and ==during code review==.

**How to make it safe (📑 p.5, p.10)?** Refactoring can introduce bugs, and managers worry it takes time away from features. So it must be ==systematic, incremental and safe==: use named refactoring "patterns" (Fowler's catalogue, like the GoF catalogue for design patterns), and ==test constantly== — run the test suite after each small step; if a test fails, you know immediately what broke.

**Problems with refactoring (📑 p.13):** ==Databases== — business apps are tightly coupled to the DB schema, and code is easy to change but databases are not. ==Changing interfaces== — if an interface is "published" and used by code you do not own, you cannot change it freely.

---

## 3. The catalogue of bad smells (with code)

Learn each smell as: *what it is → why it is bad → which refactoring fixes it.*

### 3.1 Duplicated Code (📑 p.16–17)
The same code structure appears in more than one place. It is bad because ==if you modify one copy but not the others, you introduce a bug==. Fix with **Extract Method** (same class), **Pull Up Method** (sibling subclasses), or **Extract Class**.

### 3.2 Long Method (📑 p.16, p.18)
A method that does too many things is hard to understand, test and reuse. The slide's `processOrder()` validates the order, calculates the total, applies a discount, formats a receipt and prints it — five jobs. Fix with **Extract Method** for each job (and **Decompose Conditional** for complex `if`s). Comments that separate "sections" inside a method are a clear sign.

### 3.3 Large Class (📑 p.16)
A class trying to do too much, with many fields and methods, has ==low cohesion==. Fix with **Extract Class** (and Extract Subclass).

### 3.4 Long Parameter List (📑 p.19)
```java
public void processPayment(String name, String email, String cardNumber, String expiry, double amount)
```
It is ==hard to remember the parameter order, easy to pass wrong values, and repeated across methods==. Fix with **Introduce Parameter Object** (e.g. `Customer`, `Card`) or **Preserve Whole Object**.

### 3.5 Divergent Change (📑 p.20–21)
==One class is changed for many different reasons==: "I change these three methods every time we get a new database, and these four every time tax rules change." The slide's `Employee` class changes when personal info rules change, when report format changes, when email integration changes, and when pay/tax rules change. It violates the Single Responsibility Principle. Fix with **Extract Class** so that each class has one reason to change (`Employee`, `EmployeeReportFormatter`, `EmailNotifier`, `PayCalculator`).

### 3.6 Shotgun Surgery (📑 p.20, p.22)
==One change requires many small changes in many different classes.== For example, if the minimum order amount `500` or the message text is hard-coded in `Cart`, `Checkout`, `Invoice` and `EmailService`, changing the rule means editing all four — and missing one causes a bug. Fix with **Move Method / Move Field** to gather the logic into one class (or a constant).

```java
class Cart     { boolean ok(double t){ return t >= 500; } }        // rule copy 1
class Checkout { void pay(double t){ if (t < 500) error(); } }     // rule copy 2
class Invoice  { String note(double t){ return t<500 ? "Min 500" : ""; } } // copy 3
// Refactored: one place owns the rule
class OrderPolicy { static final double MIN_ORDER = 500;
                    static boolean meetsMinimum(double t){ return t >= MIN_ORDER; } }
```

> [!warning] ⚠️ Common mistake — Divergent Change vs Shotgun Surgery
> They are opposites. ==Divergent Change: ONE class, MANY kinds of change== (fix: split the class). ==Shotgun Surgery: ONE kind of change, MANY classes touched== (fix: gather the logic into one class).

### 3.7 Feature Envy (📑 p.23–24)
==A method uses more data and methods of another class than of its own.== In the slide, `Invoice.calculateDiscount(Customer c)` calls `c.getTotalSpent()` and `c.getYearsAsMember()` repeatedly and uses nothing of `Invoice`. Fix: **Move Method** — "move it closer" to the data, i.e. `customer.calculateDiscount()`.

### 3.8 Data Clumps (📑 p.23)
==The same group of data items keeps appearing together== (as fields in several classes or as parameters in several methods) but is not its own class. Example: `street, postOffice, district` appear together in `Student`; `startDate, endDate` appear together in many methods. Fix with **Extract Class** / **Introduce Parameter Object** (`Address`, `DateRange`).

### 3.9 Primitive Obsession (📑 p.25)
==Reluctance to use small classes, using primitives instead==, e.g. separate arrays `stdId[]`, `stdName[]`, `stdMarks[]` instead of a `Student` class, or using `int type = 1/2` for UG/PG, or a `String` for money/phone. Fix: **Replace Data Value with Object**, **Extract Class**, **Replace Type Code with Subclasses/State/Strategy**.

### 3.10 Switch Statements (📑 p.25)
`switch` or long `if-else` chains on a type code are often duplicated in many places; adding a new type means editing every switch. Fix: **Replace Conditional with Polymorphism** ("let OO do your selection for you").

### 3.11 Lazy Class (📑 p.26)
==A class that no longer pays its way==, e.g. a `Logger` that only calls `System.out.println`. It adds complexity without benefit. Fix: **Inline Class** (or Collapse Hierarchy).

### 3.12 Data Class (📑 p.27–28)
A class with only fields, getters and setters and no behaviour. Not always bad; it is a problem ==when behaviour that belongs with the data is scattered in other classes== (which then show Feature Envy). Fix: **Move Method** into it, **Encapsulate Field/Collection**.

### 3.13 Comments (📑 p.29)
Comments used to explain confusing code are "==used as a deodorant==" to hide a bad smell. Fix: **Extract Method** with a name that says what the comment said, **Rename Method**, **Extract Variable**.

### 3.14 Smells asked in TF but not on the slides

**Refused Bequest.** ==A subclass inherits methods/data from its parent but does not want or use them==, often overriding them to do nothing or throw an exception. This suggests the inheritance is wrong (violates Liskov Substitution).
```java
class Bird { void fly() { ... }  void eat() { ... } }
class Penguin extends Bird {
    @Override void fly() { throw new UnsupportedOperationException(); } // refuses parent's behaviour
}
```
Fix: **Replace Inheritance with Delegation**, or **Push Down Method** (move `fly()` into a `FlyingBird` subclass so `Penguin` extends `Bird` only).

**Parallel Inheritance Hierarchies.** ==Every time you create a subclass in one hierarchy, you must also create a matching subclass in another hierarchy.== For example, every `Employee` subtype (`Engineer`, `Salesman`) needs a matching `EngineerPay`, `SalesmanPay`. It is a special case of Shotgun Surgery. Fix: **Move Method/Move Field** so that one hierarchy refers to the other and one of them collapses (e.g. put `calculatePay()` inside each `Employee` subclass).
```java
abstract class Employee {}      class Engineer extends Employee {}   class Salesman extends Employee {}
abstract class PayCalc {}       class EngineerPay extends PayCalc {} class SalesmanPay extends PayCalc {}
// adding Manager forces adding ManagerPay as well -> parallel hierarchies
```

**Speculative Generality.** Classes, parameters or hooks added "because we might need it someday" but never used. Fix: Collapse Hierarchy, Inline Class, Remove Parameter.

**Message Chains.** `a.getB().getC().getD().doSomething()` — the client depends on the whole navigation structure. Fix: **Hide Delegate**.

**Middle Man.** A class whose methods mostly just delegate to another class. Fix: **Remove Middle Man**, call the real object directly.

**Temporary Field.** A field that is set and used only in some situations and is empty otherwise (e.g. `isFulltime` used only for PG students). Fix: Extract Class / move it into the subclass where it makes sense.

**Magic Number.** A literal with unexplained meaning, like `9.81`, `50000`, `3.5`. Fix: **Replace Magic Number with Symbolic Constant** (📑 p.4).

**Dead Code.** Code that is never executed or variables never used. Fix: delete it.

---

## 4. Refactoring techniques (with before/after code)

📑 Catalogue list on p.30; details p.31–46. Name the technique exactly as below in your answer — the name earns marks.

### Consolidate Duplicate Conditional Fragments (📑 p.3)
The same code appears in every branch of a conditional; move it outside.
```java
// Before
if (isSpecialDeal()) { total = price * 0.95; send(); }
else                 { total = price * 0.98; send(); }
// After
if (isSpecialDeal()) total = price * 0.95;
else                 total = price * 0.98;
send();
```

### Replace Magic Number with Symbolic Constant (📑 p.4)
```java
static final double GRAVITATIONAL_CONSTANT = 9.81;
double potentialEnergy(double mass, double height) {
    return mass * GRAVITATIONAL_CONSTANT * height;
}
```

### Extract Method (📑 p.31–32)
==You have a code fragment that can be grouped together; turn it into a method whose name explains its purpose.==
```java
// Before
void printOwing() {
    printBanner();
    System.out.println("name: " + name);       // details
    System.out.println("amount: " + getOutstanding());
}
// After
void printOwing() { printBanner(); printDetails(getOutstanding()); }
void printDetails(double outstanding) {
    System.out.println("name: " + name);
    System.out.println("amount: " + outstanding);
}
```

### Extract Class (📑 p.33)
==When one class does the work of two, create a new class and move the related fields and methods into it.==
```java
// Before: Student holds street, postOffice, district + address formatting
// After
class Address {
    private String street, postOffice, district;
    String format() { return street + ", " + postOffice + ", " + district; }
}
class Student { private String name, id; private Address address; }
```

### Extract Variable (📑 p.34–35)
==Put the result of a hard-to-understand expression (or its parts) into self-explanatory variables.==
```java
// Before
return quantity * itemPrice * (quantity > 100 ? 0.9 : 0.95);
// After
double basePrice = quantity * itemPrice;
boolean isBulkOrder = quantity > 100;
double discountRate = isBulkOrder ? 0.9 : 0.95;
return basePrice * discountRate;
```

### Replace Temp with Query (📑 p.36–38)
==A temporary variable holds the result of an expression; extract the expression into a method and use the method everywhere==, so other methods can reuse it.
```java
// Before
double basePrice = quantity * itemPrice;
if (basePrice > 1000) return basePrice * 0.95; else return basePrice * 0.98;
// After
if (getBasePrice() > 1000) return getBasePrice() * 0.95; else return getBasePrice() * 0.98;
private double getBasePrice() { return quantity * itemPrice; }
```

### Move Method (📑 p.39–40)
==A method uses more features of another class than of its own; move it into the class it uses most==, leaving a simple delegation or nothing.
```java
// Before: Car.calculateFuelEfficiency() returns engine.getDistance()/engine.getFuelUsed()
// After
class Engine { double calculateFuelEfficiency() { return distance / fuelUsed; } }
class Car    { double calculateFuelEfficiency() { return engine.calculateFuelEfficiency(); } } // optional delegation
```

### Replace Conditional with Polymorphism (📑 p.41–42)
==A conditional chooses behaviour based on the type of an object; move each leg into an overriding method of a subclass and make the original method abstract.==
```java
// Before
double getSpeed() {
    switch (type) {
        case EUROPEAN: return getBaseSpeed();
        case AFRICAN:  return getBaseSpeed() - getLoadFactor() * numberOfCoconuts;
        case NORWEGIAN_BLUE: return isNailed ? 0 : getBaseSpeed(voltage);
    }
    throw new RuntimeException("Unknown bird");
}
// After
abstract class Bird { abstract double getSpeed(); }
class European extends Bird { double getSpeed() { return getBaseSpeed(); } }
class African  extends Bird { double getSpeed() { return getBaseSpeed() - getLoadFactor() * numberOfCoconuts; } }
class NorwegianBlue extends Bird { double getSpeed() { return isNailed ? 0 : getBaseSpeed(voltage); } }
// client: for (Bird b : birds) System.out.println(b.getSpeed());
```

### Replace Type Code with Subclasses / State / Strategy
When a class uses an `int`/`String` type code (`type == 1 // UG`) to change behaviour, replace the code with subclasses (`UGStudent`, `PGStudent`) if the type never changes after creation, or with a **State/Strategy** object (`FeePolicy`) if the type can change at runtime. This is usually done together with Replace Conditional with Polymorphism.

### Separate Query from Modifier (📑 p.43–44)
==A method returns a value AND changes state (a side effect); split it into a pure query and a separate modifier.==
```java
// Before: getTotalOutstandingAndSetReadyForSummaries()
// After
public double getTotalOutstanding() { return totalOutstanding; }   // pure query
public void setReadyForSummaries()  { readyForSummaries = true; }  // explicit modifier
```

### Introduce Parameter Object (📑 p.45–46)
==A group of parameters that naturally go together is replaced by an object==; the new class often attracts behaviour later.
```java
class DateRange {
    private final Date start, end;
    DateRange(Date start, Date end) { this.start = start; this.end = end; }
    boolean includes(Date d) { return !d.before(start) && !d.after(end); }
}
double amountInvoicedIn(DateRange range) { ... }
double amountOverdueIn(DateRange range)  { ... }
```

### Replace Nested Conditional with Guard Clauses (📑 p.30)
Deeply nested `if-else` hides the normal path. Handle the special cases first with early `return`s.
```java
// Before (CSE307 2022-23 Q5(b)(iii) shape)
double getPayAmount() {
    double result;
    if (isDead) result = deadAmount();
    else { if (isSeparated) result = separatedAmount();
           else { if (isRetired) result = retiredAmount(); else result = normalPayAmount(); } }
    return result;
}
// After
double getPayAmount() {
    if (isDead)      return deadAmount();
    if (isSeparated) return separatedAmount();
    if (isRetired)   return retiredAmount();
    return normalPayAmount();
}
```

### Decompose Conditional
A complicated condition is extracted into well-named methods/variables.
```java
// Before
if ((platform.toUpperCase().indexOf("MAC") > -1) && (browser.toUpperCase().indexOf("IE") > -1)
        && wasInitialized() && resize > 0) { ... }
// After (Extract Variable / Decompose Conditional)
final boolean isMacOs     = platform.toUpperCase().indexOf("MAC") > -1;
final boolean isIEBrowser = browser.toUpperCase().indexOf("IE")  > -1;
final boolean wasResized  = resize > 0;
if (isMacOs && isIEBrowser && wasInitialized() && wasResized) { ... }
```

### Consolidate Conditional Expression
Several conditions that lead to the same result are combined into one condition, then usually extracted into a method.
```java
// Before
if (seniority < 2) return 0;
if (monthsDisabled > 12) return 0;
if (isPartTime) return 0;
// After
if (isNotEligibleForDisability()) return 0;
boolean isNotEligibleForDisability() { return seniority < 2 || monthsDisabled > 12 || isPartTime; }
```

### Pull Up Method / Rename Method / Others
**Pull Up Method**: two subclasses have identical methods → move the method to the superclass (removes duplication). **Push Down Method**: a superclass method used by only one subclass → move it down (fixes Refused Bequest). **Rename Method**: the name does not reveal intent (`calc()` → `calculateTuitionFee()`). **Introduce Null Object** replaces repeated `null` checks with an object that does nothing. **Encapsulate Collection** returns a read-only view instead of the raw list.

---

## 5. Smell → refactoring mapping (say it in one sentence each)

When you see **duplicated code**, extract it into one method (Extract Method), or pull it up into the parent (Pull Up Method) if it lives in sibling subclasses. A **long method** is cut into named pieces with Extract Method, and its tangled conditions are cleaned with Decompose Conditional or Guard Clauses. A **large class** or **divergent change** is split with Extract Class so each class has one reason to change. **Shotgun surgery** and **parallel inheritance hierarchies** are fixed by Move Method/Move Field so the scattered logic lives in one place. **Feature envy** is cured by Move Method to the class whose data is used. **Data clumps**, **long parameter lists** and **primitive obsession** are fixed by Extract Class or Introduce Parameter Object (an `Address`, a `DateRange`, a `Customer`). A **switch on a type code** is replaced with polymorphism (Replace Conditional with Polymorphism / Replace Type Code with Subclasses or Strategy). **Magic numbers** become named constants. **Lazy classes** and **middle men** are inlined or removed. **Refused bequest** is fixed by Push Down Method or by replacing inheritance with delegation. **Comments that explain bad code** are replaced by Extract Method/Rename Method so the code explains itself. **Query methods with side effects** are split with Separate Query from Modifier.

> [!tip] 🎯 TF angle — how to answer "identify N smells and refactor"
> For each smell write a short paragraph: (1) ==name the smell==, (2) point to the exact lines where it appears, (3) say why it is bad, (4) ==name the refactoring technique==, (5) write the refactored code. At the end, give the final full refactored class(es). Typical smells in exam code: **type code + if-else on type** (Switch Statements / Primitive Obsession → polymorphism), **duplicated calculation** (e.g. CGPA computed in two classes → Extract Method / Move Method), **Feature Envy** (a method in class B that only reads A's fields → Move Method), **Data Clumps** (`street, postOffice, district`; `customerName, customerId`), **Long Method**, **Magic numbers** (`50000`, `0.1`), **Temporary Field** (`isFulltime` only for PG), **Long Parameter List**, **Duplicated print statements**.

---

## TF questions on this topic

> [!example] ✍️ Worked TF question — 2021-22 Q6(c) [10] — Define code smell; give 3 examples that degrade quality
> A **code smell** is a surface indication in the source code that usually corresponds to a deeper design problem. The code still compiles and works, but the smell makes it harder to understand, change and extend, so it degrades maintainability and invites bugs; it marks a place that should be refactored.
>
> **Example 1 – Duplicated Code.** The same discount calculation is copied in `Cart` and `Invoice`. If the rule changes and only one copy is updated, the two disagree — a bug. Fix: Extract Method into one shared place.
> ```java
> class Cart    { double total(double p){ return p > 1000 ? p*0.9 : p; } }
> class Invoice { double amount(double p){ return p > 1000 ? p*0.9 : p; } }
> ```
> **Example 2 – Long Method.** `processOrder()` validates, calculates total, applies discount, formats and prints the receipt in one 80-line method; it is hard to read, test and reuse. Fix: Extract Method for each step.
>
> **Example 3 – Switch Statements / type code.** `calculateFee()` checks `if (type == 1) ... else if (type == 2) ...`, and the same check is repeated in `printDetails()`. Adding a new student type requires editing every such chain. Fix: Replace Conditional with Polymorphism (`UGStudent`, `PGStudent` override `calculateFee()`).

> [!example] ✍️ Worked TF question — 2019-20 Q6(a) [20] — Program snippets showing Data Clump and Refused Bequest
> **Data Clumps** — a group of data items that always appear together (as fields or parameters) but are not their own class.
> ```java
> class Customer {
>     String name;
>     String street, city, postCode;               // clump
> }
> class Supplier {
>     String company;
>     String street, city, postCode;               // same clump again
> }
> class Shipping {
>     double cost(String street, String city, String postCode) { ... }   // same clump as parameters
> }
> ```
> The three values `street, city, postCode` travel together everywhere; any change (adding `country`) must be repeated in every place. Refactoring: **Extract Class** `Address` and **Introduce Parameter Object**.
> ```java
> class Address { String street, city, postCode; }
> class Customer { String name; Address address; }
> class Supplier { String company; Address address; }
> class Shipping { double cost(Address to) { ... } }
> ```
> **Refused Bequest** — a subclass inherits methods/fields it does not want, and refuses them by overriding with empty bodies or exceptions.
> ```java
> class Employee {
>     double salary;
>     double calculateBonus() { return salary * 0.10; }
>     void assignTeam(String team) { ... }
> }
> class Intern extends Employee {
>     @Override double calculateBonus() { throw new UnsupportedOperationException("Interns get no bonus"); }
>     @Override void assignTeam(String team) { /* does nothing */ }
> }
> ```
> `Intern` refuses most of what it inherits, so code that treats every `Employee` uniformly will crash for interns (violating Liskov Substitution). Refactoring: **Push Down Method** (move `calculateBonus()` and `assignTeam()` into a `PermanentEmployee` subclass) or **Replace Inheritance with Delegation**.

---

## Same type in the papers you will solve last

May-2026 paper Q4(a) — 5 smells in `Student`/`Scholarship` with refactoring; Q4(b) — define code smell, tech-debt, refactoring. Feb-2025 paper Q8(c) — smells in `DiscountCalculator`/`OrderProcessor` and revise. CSE307 2022-23 Q5(a) — Shotgun Surgery, Parallel Inheritance Hierarchies, Refused Bequest, Feature Envy with code; Q5(b) — refactor `renderBanner`, `getSalary`, `getPayAmount`. See [[TF 2023-24 (May 2026 paper)]], [[TF 2023-24 (Feb 2025 paper)]], [[TF 2022-23 (CSE307 May 2024)]].
