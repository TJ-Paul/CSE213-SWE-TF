# IJ-7 Software Ethics

This note covers why software is never value-neutral, the eight ethical dimensions on IJ ma'am's slides with their famous case studies, and the ==eight IEEE-CS/ACM Software Engineering Code of Ethics principles==. In the term final, ethics comes as a **scenario**: a story where an engineer or company does something questionable, and you must "identify the ethical breaches and justify". The trick to scoring is to name the violated principle or dimension precisely, quote what happened in the scenario, explain why it is unethical, and say what the ethical action would have been. A reusable answer method is given in section 5.

**TF frequency:** May-2026 Q1(b) [10] (security engineer leaks vulnerabilities to media), Feb-2025 Q6(a) [8] (health app shares data) and Q6(b) [7] ("act consistently with the public interest"). Asked in both recent CSE 213 papers — expect it again.

📑 **See:** *[2] IJ mam / 8 - Software Ethics.pdf* (12 pages).

---

## 1. The foundational idea (📑 p.2–3)

The deck opens with "With great power comes great responsibility." ==Building software is never a value-neutral act==: every architectural and algorithmic choice encodes human values, assumptions and social consequences. The **fundamental ethical question** to ask about any system is:

> [!important] 🔑 Memorize — The Fundamental Ethical Question (📑 p.3)
> =="Does this system do what it should, for whom it should, without harm?"==

Three foundations support this. **Moral judgment over algorithms**: ethical codes are not automatic rules; they need active assessment of trade-offs and consequences. **Public welfare priority**: engineers have an ==absolute duty to prioritise societal safety and rights over corporate deadline pressure==. **Preventing negligence**: ignoring known safety risks or rushing defective code directly endangers human life and livelihood.

## 2. The eight key dimensions of software ethics (📑 p.4–8)

Learn each dimension with its one-line meaning and its case study, because quoting a real case makes an answer look strong.

**1. Data Privacy** — ==informed consent and minimal data collection==. Consent must be informed, explicit and not buried in fine print, and only necessary data should be collected. *Case: Cambridge Analytica (2018)* — Facebook data of 87 million users was harvested through quiz apps for political profiling without explicit consent, leading to a $5 billion FTC fine.

**2. Bias & Fairness** — ==auditing systems against systemic discrimination==. Algorithms encode historical human biases unless they are actively tested and mitigated. *Case: Amazon AI recruiting tool (2018)* — trained on ten years of male-dominated résumés, it penalised candidates whose CV contained the word "women's"; it was scrapped.

**3. Accountability** — ==human ownership of system outcomes==. "The algorithm did it" is not an ethical or legal defence. *Case: VW Dieselgate* — VW deliberately coded defeat software (11 million cars); *Boeing 737 MAX MCAS* — software risks were concealed, contributing to crashes that killed 346 people.

**4. Transparency & Explainability** — ==auditable decision paths for users==. Opaque black-box systems stop people from contesting automated decisions about their lives. *Case: Dutch childcare benefits scandal (2021)* — an unexplainable risk algorithm falsely flagged thousands of dual-national families as fraudsters, bankrupting victims and bringing down the government.

**5. Autonomy (vs Dark Patterns)** — ==eliminate deceptive dark patterns==. UX should support the user's intention, not manipulate them for revenue. *Case: FTC v. Amazon "Iliad flow" (2023)* — signing up for Prime took one click, but cancelling required a deliberately confusing multi-step flow.

**6. Security as an Ethical Duty** — ==negligent security flaws are ethical failures==, because they cause direct physical and financial harm. *Cases: Therac-25* — software race conditions gave fatal radiation overdoses; *Equifax* — 147 million records exposed by ignoring a known Apache Struts patch for months.

**7. Sustainability** — ==minimise carbon and compute footprints==. *Case:* Strubell et al. (2019) showed training one large model can emit as much CO₂ as five cars over their lifetime, which started the Green AI movement.

**8. IP & Authorship** — ==fair licensing, especially in generative AI==. *Cases: NYT v. OpenAI and GitHub Copilot* — lawsuits over using copyrighted articles and open-source code for training without permission.

## 3. IEEE-CS / ACM Software Engineering Code — the 8 principles (📑 p.9)

This is the most important memorisation in this note. Questions like "Software engineers shall act consistently with the public interest — elaborate" come straight from here.

> [!important] 🔑 Memorize — the 8 principles (in order)
> 1. ==PUBLIC== (top priority) — act consistently with the public interest: public health, safety and welfare.
> 2. ==CLIENT AND EMPLOYER== — act in the best interests of the client and employer, consistent with the public interest (serve them loyally while staying compliant with the public good).
> 3. ==PRODUCT== — ensure products meet the highest professional standards possible (rigorous QA).
> 4. ==JUDGMENT== — maintain integrity and independence in professional judgment.
> 5. ==MANAGEMENT== — managers and leaders promote an ethical approach to managing software development.
> 6. ==PROFESSION== — advance the integrity and reputation of the profession.
> 7. ==COLLEAGUES== — be fair to and supportive of colleagues.
> 8. ==SELF== — participate in lifelong learning and promote an ethical approach to the practice.
>
> Mnemonic: **"Public Clients Produce Judgments; Managers Profess to Colleagues and Self."**

Two relations between principles score extra marks. First, ==Public overrides everything==: when the employer's interest conflicts with public safety, public safety wins — but the engineer must still act responsibly (raise it internally, then with the proper authority), not recklessly. Second, Client & Employer duties include ==confidentiality==: an engineer must not disclose confidential information of the client except when required to protect the public, and even then through proper channels.

## 4. Unethical vs ethical practice (📑 p.10)

The slide contrasts four domains. In **UX and choice architecture**, the unethical practice is deceptive dark patterns and forced retention; the ethical standard is transparent, reversible, user-centric choices. In **user data and telemetry**, the unethical practice is uninformed harvesting and re-identifying records; the ethical standard is ==privacy-by-design and minimal data collection==. In **AI and model training**, the unethical practice is unverified training data with historical bias; the ethical standard is rigorous fairness auditing. In **security and release QA**, the unethical practice is ==deploying known vulnerabilities to meet deadlines==; the ethical standard is pre-deployment safety gates and continuous patching.

The deck ends with the message that ==ethics is a design constraint, not an afterthought==; at design time ask: =="Who could this harm, and how would we know?"== (📑 p.12). The books on p.11 (O'Neil's *Weapons of Math Destruction*, Noble's *Algorithms of Oppression*, etc.) do not need to be memorised.

## 5. A reusable method for "identify the ethical breaches" questions

> [!tip] 🎯 TF angle — 4-step answer for any ethics scenario
> **Step 1 – List the actors and their actions** (engineer, company, client, users/public). **Step 2 – For each questionable action, name the breach**: which IEEE/ACM principle (Public, Client & Employer, Product, Judgment, Management, Profession, Colleagues, Self) and/or which dimension (Privacy, Bias, Accountability, Transparency, Autonomy, Security, Sustainability, IP) it violates. **Step 3 – Justify**: explain the harm, using the scenario's own words. **Step 4 – State the ethical alternative**: what should have been done. Also mention what was done *right*, if anything (e.g. "taking consent before sharing is correct"). End with a one-line verdict.

Some situations recur, so prepare these standard judgements. **Going to the media with vulnerabilities (full public disclosure without first reporting).** Finding and wanting to protect users is right (Public principle), but disclosing critical, unpatched vulnerabilities publicly and anonymously exposes citizens to attackers *before* a fix exists, so it actually increases harm. It breaks Client & Employer (confidentiality, loyalty), Judgment (integrity — acting anonymously and unilaterally) and Profession (it damages trust in the profession). The ethical path is ==responsible (coordinated) disclosure==: report to the employer/client immediately with evidence, give a reasonable time to patch, escalate to the proper authority (e.g. the government agency or national CERT) if they ignore it, and go public only as a last resort after a fix is available. **Collecting or sharing personal health data.** Consent must be informed and specific; "anonymised" data can often be re-identified when combined with age, profession and address, so sharing those quasi-identifiers breaks privacy even with consent; the data shared must be minimal and necessary (privacy-by-design). **AI or algorithm giving health/financial advice.** Advice built by engineers "studying articles" without qualified medical experts or clinical validation breaks the Product principle (highest standards, rigorous QA) and Public principle (health and safety) and needs transparency (users must know it is not a doctor) and accountability. **Shipping known bugs to meet a deadline** breaks Product and Public, and the security dimension. **Dark patterns** break Autonomy. **Biased training data** breaks Bias & Fairness and Public.

---

## TF questions on this topic

There were no in-scope ethics questions in 2021-22, 2020-21 or 2019-20 (those papers were CSE307 and did not include this deck), so practise with this worked example built in the exact exam style, then attempt the recent-paper questions listed below.

> [!example] ✍️ Practice in exam style — "A developer finds a payment app secretly sells users' location data to advertisers, and the manager tells him to stay quiet because the release is tomorrow. Identify ethical issues." [8]
> **Company selling location data without informed consent** — violates the ==Data Privacy== dimension (consent must be informed, explicit, unburied; collect only necessary data) and the ==Public== principle, since location data can endanger users. Like Cambridge Analytica, the misuse is the harm itself.
> **Manager ordering silence to meet a deadline** — violates the ==Management== principle (leaders must promote ethical development) and puts deadline pressure above public welfare, which the slides call negligence.
> **Developer's correct course** — under the ==Public== principle (top priority) he must not simply comply; under ==Client & Employer== and ==Judgment== he should first raise it formally in writing with management/legal, recommend disabling the data sale and adding a clear consent screen, and if ignored, escalate to the proper regulator rather than leaking user data or going straight to the media.
> **Verdict:** the company and manager acted unethically; the developer has a duty to raise and escalate the issue responsibly.

---

## Same type in the papers you will solve last

May-2026 paper Q1(b) — security engineer discloses vulnerabilities to the media anonymously; investigate ethical breaches. Feb-2025 paper Q6(a) — health app shares health records/age/profession/address with consent, AI suggestions built by engineers from articles; Q6(b) — elaborate "Software engineers shall act consistently with the public interest" with an example. See [[TF 2023-24 (May 2026 paper)]] and [[TF 2023-24 (Feb 2025 paper)]].
