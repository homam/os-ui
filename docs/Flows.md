# Flows, Flow Types, Clients, HOCs and UIs

```haskell
FlowType = C2SMS 
         | PIN 
         | MO 
         | ... 
```

```haskell
Flow     = C2SMS Keyword ShortCode
         | PIN Gateway
         | MO Gateway Keyword ShortCode
         | ...
```

**Flows** are server-side entities while both Clients and Server work with **Flow Types**. Flows are *parameterized* Flow Types. 

For example all C2SMS Flows work the same. Clients do not need to know the exact Keyword and ShortCodes to implement the UIs that work with C2SMS. We can extend this logic to other Flows (Clients do not need to know the Gateway by which we send a PIN, etc.). Therefore Clients do not require to deal with Flows.

**Clients** are pieces of code at the front-end side that manage all the communications related to a Flow Type with the Server. 

Clients receive actions by the user (through UI) and pass them to the server (`submit_msisdn` for instance).

Server communicates in terms of Information with its Clients (for example: `{msisdn_is_valid: true}`).

Each Client has one or more **HOCs (Higher Order Components)** associated with them. HOCs manage the user experience flow. 

Clients and their HOCs are tightly coupled with Flow Types.

HOCs 
* Translate informational messages by the server to **States**.
* Proxy actions from the **UIs** to the Client.

**UIs** are React component that implement the interface of their associated HOCs. These interfaces define all the states and actions that UI must support:

```typescript
interface PINHOC {
  currentState: MSISDNEntry | PINEntry | TQ
  actions: {
    submitMSISDN: (msisdn: string) => void,
    submitPIN: (pin: string) => void
  }
}

type MSISDNEntry = NothingYet | Entered | Failed<MSISDNErrors> | Succeed<void>
type PINEntry    = NothingYet | Entered | Failed<PINErrors>    | Succeed<PortalUrl>
```

HOC ensures that the UI is at one state at a time and makes some actions available to the UI (and the user).
 
HOC communicate with the UI in terms of instructions. For example an HOC may instruct the UI to show `MSISDNEntry at Entered` state to the user.

Using types we guarantee that UIs support the exact set of States that their HOC require. UIs cannot miss to implement one State or expect an State that is not defined in their HOC.

So far we only theorized the simplest case: when we are dealing with one flow.

Let's borrow some vocabulary from Bupper to discuss cases when we have multiple flows depending on some condition or context.

A **Scenario** is a collection of Flows and conditions. Think about Scenario as a deterministic algorithm that has one Entry and always Ends with a Flow. At client-side, ignoring parametrization, there are countable and enumerable number of Generic Scenarios.

Generic Scenarios are identifiable by their States and Actions.

For example these are examples of Generic Scenarios:

```
...PIN Flow Type (all States and Actions of the PIN Flow alone)
```

```
...Click and Redirect Flow Type (all States and Actions of the Click and Redirect Flow alone)
```

```
State: Operator Selection
Actions: {selectOperator: operator => S}

...PIN Flow Type

...MO Flow Type
```

```
State: MSISDN Entry
Actions: {submitMSISDN: msisdn => S}

...PIN Flow Type

...Redirect Flow Type
```

User Experience and design only deals with Generic Scenarios.

Scenario is a deterministic algorithm:

```
If operator is known
  Then goto known_operator
  Else
    CurrentState: Operator Selection
    Actions:      {selectOperator: operator => goto known_operator}

known_operator:
switch operator
  "A" -> PIN Flow
  "B" -> Redirect Flow
```

Generic Scenarios can be implemented by HOCs (`MSISDNEntry_PIN_Redirect_HOC`) and Scenarios can be implemented by specialized clients (`Iraq_Client`).

In this example `Iraq_Client` knows that is is compatible with `MSISDNEntry_PIN_Redirect_HOC`.

Any **Landing Page (UI)** is compatible (implements) exactly one Generic Scenario.

Here:

```
Love_Test_LP  implements          MSISDNEntry_PIN_Redirect_HOC
Iraq_Client   is compatible with  MSISDNEntry_PIN_Redirect_HOC
```

This means we can build `Love_Test_LP` with `Iraq_Client`.





---
---


```
Generic Scenario (Front-end) ~ [FlowType]
Scenario (Front-end) ~ [Conditions, FlowType]
```


Instructions are defined in the HOCs associated with the client.


```
Handle = Scenario and Params => Page
```

```
Campaigns = (Affiliate, Handle)
```