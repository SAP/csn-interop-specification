---
title: Airline
sidebar_position: 1
---

## Description

The airline example is our primary example file:

- It shows how with CSN its possible to describe the Entity-Relationship model, including associations.
- It also showcases how the CDS Service concept work and how CDS entities are assigned to it via name prefixing.

The example is a subset of the [CAP SFlight](https://github.com/SAP-samples/cap-sflight) example data model, stripped down and slightly adapted to the scope specified so far, and to the entities: _Airline_, _Airport_, _Countries_, _Countries_texts_, _FlightConnection_ and _Flight_.

We start with a simple model representing six plain tables. Then add only annotations, then only foreign key and text associations. Finally we combine both to a complete ER Model incl. some more annotations towards analytical modeling and assignment to a CDS Service.
