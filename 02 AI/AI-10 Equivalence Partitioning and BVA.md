# AI-10 Equivalence Partitioning and BVA

This note covers AI sir's Lecture 13: equivalence partitioning (EP), boundary value analysis (BVA), and positive versus negative testing. These are the black-box test-design techniques, and they are the most "mechanical" marks in the whole paper: once you know the steps, every question of the form "construct test cases for…", "derive BVA test cases for…" or "construct weak/strong ECT" is guaranteed marks. The note also adds weak and strong equivalence class testing, which the slides do not name but the May-2026 paper asks directly.

**TF frequency:** EP test set (2020-21 Q5b), negative testing ideas (2021-22 Q4c), positive & negative testing (2020-21 Q7a), BVA unit test (2019-20 Q7a), EP principle (Feb-2025 Q3c), income-tax slab test cases (CSE307 2022-23 Q1b), weak/strong ECT (May-2026 Q5a), BVA for a pump controller (May-2026 Q7b). Basically every paper.

📑 **See:** *[1] AI sir / Lec 13 - Equivalence partitioning, positive and negative testing.pdf* → p.1 (EP definition), p.2 (savings partitions table — look at the picture), p.3 (how NOT to test), p.4 (how to test), p.5 (BVA number line), p.6–7 (positive/negative), p.8–14 (negative testing scenarios with screenshots).

---

## 1. Equivalence partitioning

==Equivalence partitioning== divides the input data of a software unit into partitions of equivalent data, assuming that all the values in one partition will be treated in the same way by the software. Because of that assumption, we only need to test ==one value from each partition==. If one value of a partition works, we assume every value in that partition works, so testing more values from it is wasted effort. Similarly, if one value of a partition fails, we assume none of the values in that partition will work.

> [!important] 🔑 Memorize — EP definition (Lec 13 p.1)
> Divide the input domain into partitions (equivalence classes) such that all values in a partition are treated the same way by the software. Test **one representative value per partition**: if it works, the whole partition is assumed to work; if it fails, the whole partition is assumed to fail.

Why is EP used in real-life software? Because exhaustive testing is impossible — an `int` input alone has about four billion values — while EP reduces the test set to a handful of cases that still exercise every distinct behaviour of the program, including the invalid inputs. It gives the maximum defect-finding power per test case, avoids redundant tests that check the same behaviour twice, and makes it easy to show that every rule of the specification has been tested. This is the answer to "why is this testing used in real-life software".

### How to find partitions

Read the specification and, for every input, look for ranges, sets of values, or rules that cause different behaviour. Each range or rule gives one ==valid partition==. Then add ==invalid partitions== for values that the specification does not allow: values below the lowest range, above the highest range, wrong type, empty, and so on. For a range like 18 to 60 you normally get one valid partition (18–60) and two invalid partitions (below 18 and above 60). For a set of allowed values like {Student, Regular} you get one valid partition per value that behaves differently, and one invalid partition for anything else.

### The savings-account example from the slides

A savings account gives 0.5% interest if the balance is $0 up to $1000, 0.75% if the balance is $1000 up to $10000, and 1% above $10000. The slide (p.2) turns this into four partitions: ==balance < 0== is invalid (interest undefined), ==0 ≤ balance < 1000== gives 0.5%, ==1000 ≤ balance < 10000== gives 0.75%, and ==10000 ≤ balance== gives 1%.

The "how not to test" slide (p.3) tests the balances 0, 500, 1000, 2000 and 5000. That is five tests but they only touch two partitions: 0 and 500 are in partition 2, and 1000, 2000 and 5000 are all in partition 3. The invalid partition and the 1% partition are never tested, while partition 3 is tested three times for no benefit. The "how to test" slide (p.4) picks one value from each partition instead: a negative balance (−1.0) must throw an exception, 100.0 must give 0.50 interest, a value in the third partition such as 5000.0 must give 37.5, and 20000.0 must give 200.0.

```java
@Test
public void negativeBalance_throwsException() {
    try {
        calculateSavingsInterest(-1.0f);
        fail("Exception expected");          // reaching here means no exception: test fails
    } catch (Exception ex) { /* expected */ }
}

@Test
public void balanceBelow1000_gets0_5Percent() {
    assertEquals(0.50, calculateSavingsInterest(100.0f), 0.001);   // partition 2
}

@Test
public void balance1000to10000_gets0_75Percent() {
    assertEquals(37.5, calculateSavingsInterest(5000.0f), 0.001);  // partition 3
}

@Test
public void balanceAbove10000_gets1Percent() {
    assertEquals(200.0, calculateSavingsInterest(20000.0f), 0.001); // partition 4
}
```

In JUnit 4 you can also write the exception test as `@Test(expected = IllegalArgumentException.class)`, and in JUnit 5 as `assertThrows(IllegalArgumentException.class, () -> calculateSavingsInterest(-1));`. Note the third argument of `assertEquals` for doubles: it is the allowed tolerance (delta), and leaving it out for floating-point values is a common mistake.

## 2. Boundary value analysis

==Boundary value analysis== is based on testing at the boundaries between partitions. The reason is an observation from practice: ==more application errors occur at the boundaries of the input domain== than in the middle, because programmers confuse `<` with `<=`, start a loop at 1 instead of 0, and so on. EP picks *any* value from a partition; BVA picks the values right at its edges. The two techniques are used together: EP tells you which partitions exist, and BVA tells you which exact values to test at the edges.

For the savings example the slide (p.5) lists the boundary values −0.01, 0, 0.01, 999.99, 1000, 9999.99 and 10000 (the precision of money is one cent, so "just below" 1000 is 999.99).

> [!important] 🔑 Memorize — BVA rule
> For every boundary of a valid range [min, max], test values **at** the boundary and **just outside** it (and, for 3-value BVA, also **just inside** it). "Just" means one unit of the input's precision: 1 for integers, 0.01 for money, etc.

### Two-value and three-value BVA

In ==two-value BVA==, for each boundary you test the boundary value itself and the value just across it in the neighbouring partition. For a valid range 30 ≤ M ≤ 70 on integers this gives 29, 30, 70 and 71. In ==three-value BVA==, for each boundary you test just below, at, and just above. For 30 ≤ M ≤ 70 this gives 29, 30, 31 at the lower edge and 69, 70, 71 at the upper edge. Many teachers also expect one ==nominal== value from the middle (for example 50) to show the partition works normally.

### Normal and robust BVA for several inputs

When a function has several inputs, ==normal BVA== keeps all inputs at their nominal value and varies one input at a time through min, min+1, nominal, max−1 and max. For *n* inputs this gives ==4n + 1== test cases (4 boundary-ish values per input plus one all-nominal case). ==Robust BVA== also adds the invalid values min−1 and max+1 for each input, giving ==6n + 1== test cases. Robust BVA is the one that checks that invalid values are rejected properly.

### A worked BVA example (not from a paper)

Suppose a shop gives free delivery if the order total T (an integer number of taka) satisfies 500 ≤ T ≤ 5000, charges 60 taka delivery if 1 ≤ T ≤ 499, and rejects the order if T ≤ 0 or T > 5000 (bulk orders handled separately). For the free-delivery partition, three-value BVA gives the lower edge values 499 (expected: 60 taka, belongs to the paid partition), 500 (free) and 501 (free), the upper edge values 4999 (free), 5000 (free) and 5001 (rejected), and a nominal value such as 2500 (free). Writing the expected output for each value is essential, because a boundary test without an expected result earns little.

## 3. Weak and strong equivalence class testing (asked in TF, not named in slides)

When there are several inputs, each with its own equivalence classes, we must decide how to *combine* the classes into test cases. There are four standard ways.

==Weak normal ECT== uses only the valid classes and makes sure that every valid class of every input appears in at least one test case. It relies on the *single-fault assumption* (a failure is caused by one input at a time), so the classes do not have to be combined in all ways. The number of test cases equals the ==largest number of valid classes of any single input==.

==Strong normal ECT== uses only the valid classes but tests *every combination* of them (the Cartesian product). It relies on the *multiple-fault assumption*. The number of test cases equals the ==product of the numbers of valid classes==.

==Weak robust ECT== is weak normal plus invalid classes: each invalid class is tested in its own test case while every other input is kept valid, so that if the test fails we know exactly which invalid input caused it. Its count is the weak normal count plus the number of invalid classes.

==Strong robust ECT== takes the Cartesian product of *all* classes, valid and invalid, so its count is the ==product of (valid + invalid) classes of each input==.

> [!important] 🔑 Memorize — counting formulas
> Weak normal = **max** (valid classes per input)
> Strong normal = **product** (valid classes per input)
> Weak robust = weak normal + number of invalid classes
> Strong robust = **product** (all classes per input)
> If the question lists invalid classes as ordinary classes and just says "weak ECT" / "strong ECT", use weak = max(total classes per input) and strong = product(total classes per input), and state the assumption you used.

### Worked example (not from a paper)

A library system decides a borrowing limit from two inputs. Age has classes A1: under 18, A2: 18 to 60, A3: above 60, and A4: invalid age (negative or non-numeric). Member type has classes M1: student, M2: regular, and M3: invalid or missing type. The valid classes are A1, A2, A3 (3) and M1, M2 (2).

Weak normal needs max(3, 2) = 3 tests: (A1, M1), (A2, M2), (A3, M1). Strong normal needs 3 × 2 = 6 tests: (A1,M1), (A1,M2), (A2,M1), (A2,M2), (A3,M1), (A3,M2). Weak robust adds one test per invalid class to the 3 weak normal tests: (A4, M1) and (A2, M3), so 5 tests. Strong robust needs 4 × 3 = 12 tests, all combinations including (A4, M3).

The typical defect that ==weak ECT can miss== is an *interaction* fault, one that only appears for a particular combination. For example, if the code wrongly gives senior students (A3 with M1) the senior-regular limit, weak normal might never test (A3, M2) or might test (A3, M1) only, depending on the chosen set, and a bug in the other combination stays hidden. Strong ECT would catch it because it tries every combination. This is the standard answer to "illustrate a defect that weak ECT may not discover".

### Exam format for test cases

Test-case lists are one of the few places where a small table is the clearest format. Use the columns test ID, input values, partition/class covered, and expected output, like this:

| ID | Age | Member type | Classes | Expected |
|---|---|---|---|---|
| T1 | 15 | Student | A1, M1 | limit 2 books |
| T2 | 35 | Regular | A2, M2 | limit 5 books |
| T3 | 70 | Student | A3, M1 | limit 3 books |
| T4 | −4 | Student | A4, M1 | error: invalid age |
| T5 | 35 | (blank) | A2, M3 | error: member type required |

## 4. Positive and negative testing

==Positive testing== validates that the application works when given ==valid input data==. Its purpose is to verify that the application does *not* show an error when it is not supposed to. For example, entering a correctly formatted phone number must be accepted without complaint.

==Negative testing== is performed by giving ==invalid data== as input. It checks whether the application behaves as expected with that negative input and ensures that it can ==gracefully handle invalid input or unexpected user behaviour==, for example entering `xyZ#53()032` as a phone number must produce a clear error message, not a crash or silent acceptance.

> [!important] 🔑 Memorize — one line each
> **Positive testing:** valid input → the system must work and must NOT show an error.
> **Negative testing:** invalid input → the system must reject it gracefully (clear message, no crash, no corrupted data).

### The negative testing scenarios on the slides

The slides list seven typical negative testing scenarios, and together they are the full answer to "five negative testing ideas for a web application". The first is ==not populating required fields==: leave email or password blank on a sign-up form and press Continue; the form must refuse and highlight the empty fields (p.8). The second is ==correspondence between data and field types==: put letters into a numeric field such as phone number or date of birth (p.9). The third is ==allowed number of characters==: enter more characters than a field allows, such as a 15-digit mobile number into an 11-digit field (p.10). The fourth is ==allowed data bounds and limits==: enter a value below the lower bound or above the upper bound, such as day = −1 or month = 13 (p.11). The fifth is ==out-of-range values== for the data type itself: values beyond the integer range (−2,147,483,648 to 2,147,483,647 for 4-byte int, −32,768 to 32,767 for 2-byte) or beyond float range (±3.4E+38) (p.12). The sixth is ==reasonable data==: values that are technically valid in type but unreasonable, such as a name with 300 characters or a human age of 200 years, or a birth year of 1854 (p.13). The seventh is ==web session testing==: copy URLs of pages you visited while logged in, log out, and open those URLs again; the application must redirect to the login page instead of showing the private page (p.14).

> [!tip] 🎯 TF angle
> For every positive test, write the matching negative test next to it; examiners look for both and for the *expected behaviour* (accepted / rejected with a message). Tie your examples to the scenario in the question rather than giving generic examples.

---

## TF questions on this topic

> [!example] ✍️ Worked TF question — 2021-22 Q4(c) [5] — Five negative testing ideas for a web application
> I will use a university course-registration website as the example.
> 1. **Required fields left empty:** submit the login form with a blank password. Expected: the form is not submitted and "Password is required" is shown.
> 2. **Wrong data type:** enter "abc" in the Student ID field that expects digits. Expected: validation error "Student ID must be numeric".
> 3. **Too many characters:** paste 500 characters into the 50-character "Full name" field. Expected: input is limited or rejected with a message, no database error.
> 4. **Out of allowed bounds:** register for 0 or −3 credit hours, or select month = 13 in a date field. Expected: rejected with a range message.
> 5. **Session testing:** copy the URL of the "My registered courses" page, log out, and open the URL again. Expected: redirected to the login page; the private page is not shown.
> (Other valid ideas: unreasonable data such as age 200; values outside the integer range.)

> [!example] ✍️ Worked TF question — 2020-21 Q7(a) [10] — Positive and negative testing for the laptop/phone requisition process
> **Rule being tested:** a general manager (GM) is entitled to one laptop and two mobile phones per year; the requisition software must enforce this.
>
> **Positive tests (valid input, must be accepted):** a GM who has received no laptop this year submits a laptop requisition — it is accepted and forwarded for approval. A GM who has received no phone this year requests one phone — accepted. The same GM requests a second phone in the same year — accepted, because two are allowed. In the next calendar year the GM requests a laptop again — accepted, because the yearly entitlement has reset. A requisition with all required fields filled correctly (employee ID, item, justification, date) is saved without any error.
>
> **Negative tests (invalid input or behaviour, must be rejected gracefully):** the GM requests a second laptop in the same year — rejected with "Laptop entitlement for this year already used". The GM requests a third phone in the same year — rejected. A non-GM employee (for example an executive) submits a laptop requisition under this policy — rejected as not entitled. A requisition with quantity 2 laptops or quantity 0 or −1 — rejected. Required fields left blank (no item type or no employee ID) — not submitted, error shown. A requisition dated in the past year or with an invalid date such as 31/02 — rejected. Submitting the same requisition twice by double-clicking — only one requisition is recorded.

> [!example] ✍️ Worked TF question — 2020-21 Q5(b) [12] — Equivalence partitioning for the Release Order cost
> **EP meaning:** equivalence partitioning divides each input into partitions whose values are processed the same way, and we test one representative value per partition, including invalid partitions, so we get full behavioural coverage with few test cases.
>
> **Assumed rule (from Q5(a)):** cost of one ad in a Release Order = page rate per column-inch × size (column-inches) × (1 − discount of that newspaper). The page rate depends on the selected page; size must be positive and cannot exceed the page size (assume 1 to 96 column-inches); discount is a percentage from 0 to 100; the publishing date must be in the future; the total cost must not exceed the approved budget.
>
> **Partitions:** Page: P1 valid page of the newspaper (e.g. front page, rate 2000/col-inch), P2 another valid page with a different rate (inside page, 800), P3 page that does not exist in that newspaper (invalid). Size: S1 1–96 (valid), S2 ≤ 0 (invalid), S3 > 96 (invalid). Discount: D1 0% (no discount), D2 1–100% (valid discount), D3 < 0 or > 100 (invalid). Date: Dt1 future date (valid), Dt2 past date (invalid). Budget: B1 total ≤ budget (valid), B2 total > budget (invalid).
>
> **Test cases (one value per partition, other inputs valid):**
> | ID | Page | Size | Disc | Date | Classes | Expected |
> |---|---|---|---|---|---|---|
> | T1 | Front | 10 | 0% | future | P1,S1,D1,Dt1,B1 | 2000×10 = 20,000 |
> | T2 | Inside | 10 | 20% | future | P2,S1,D2,Dt1,B1 | 800×10×0.8 = 6,400 |
> | T3 | Page 99 | 10 | 0% | future | P3 | error: invalid page |
> | T4 | Front | 0 | 0% | future | S2 | error: invalid size |
> | T5 | Front | 120 | 0% | future | S3 | error: exceeds page size |
> | T6 | Front | 10 | 150% | future | D3 | error: invalid discount |
> | T7 | Front | 10 | 0% | yesterday | Dt2 | error: date in the past |
> | T8 | Front | 90 | 0% | future (budget 50,000) | B2 | error: exceeds budget |
> The valid tests (T1, T2) check that the cost is computed correctly with and without discount and for different page rates; each invalid test changes exactly one input so a failure points to one cause.

Related worked question elsewhere: 2019-20 Q7(a) — unit test method for a grading policy using BVA — is solved in [[IJ-4 Unit Testing and JUnit]], because it is mainly a JUnit-writing question. The BVA values it uses come from section 2 of this note.

## Same type in the papers you will solve last

Do not solve these now. 2023-24 (May-2026 paper) Q5(a) — weak and strong ECT for course registration, count of strong cases, and a defect weak ECT misses (section 3). 2023-24 (May-2026 paper) Q7(b) — BVA test cases for the LOW-power partition of a pump (section 2). Feb-2025 paper Q3(c) — basic principle of EP and why it is used (section 1). CSE307 2022-23 Q1(b) — test cases for income-tax slabs (EP + BVA together). See [[TF 2023-24 (May 2026 paper)]], [[TF 2023-24 (Feb 2025 paper)]] and [[TF 2022-23 (CSE307 May 2024)]].

Related notes: [[AI-8 Software Testing Fundamentals]] · [[AI-9 Code Coverage and White-box Testing]] · [[IJ-4 Unit Testing and JUnit]]
