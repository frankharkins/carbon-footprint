# Carbon footprint calculator

This is a small project to help me learn svelte, and maybe even make something
useful. There are lots of carbon footprint calculators out there, but the idea
here is to show users how their actions change their footprint in real time
(instead of after submitting a form, or re-taking the quiz). This way, hopefully
the user can get a feel for which changes have the biggest impact.

## Running locally

To run locally, first clone the repo, then:

```
cd carbon-footprint
npm install
npm run dev
```

To deploy, locally run `./deploy.sh` (you'll need to be on `main` and stash any changes first).

## Editing the calculator

If you think there's an error or significant inaccuracy in this calculator, you
can make an issue, make PR to fix it, or make a fork with your own values. All
content and variables for this calculator are stored in `src/content.yaml`. It
should hopefully be pretty clear how editing this file affects the built web
app, but here's a quick overview of how it works:

- This carbon calculator app is built from a bunch of smaller calculators (e.g.
  travel, diet), each in its own panel. Each calculator is an entry under
  `calculators`, and you can add more entries to create more panels.

- Calculators contain variables that the user can change. Each variable has a
  `kgco2pu` value, which is the kg of CO2 produced per 'unit'. The unit used for
  this value should be:
  - km for distance,
  - years for time,
  - grams for mass.

  We have some special syntax that creates a dropdown box where users can change
  the input units, (e.g. `[ km | miles ]`). If the software recognizes a unit,
  it'll multiply the result by the conversion factor to correct for the change
  in units. E.g. if the user selects miles (~1.61km), the calculator would
  return `value * kgco2pu * 1.61`. You can use an `@` symbol to override the
  built-in conversion unit, which allows you to mix different types of units.
  For example, we assume planes move at ~800km/hr, so we let the user select
  'hours' as one of the units. The label for this variable is
  `[ hours @ 800 | km | miles ]`, which means our calculator returns
  `value * kgco2pu * 800`.

  Each variable has a `minmax` value. When the variable input is in slider
  mode, the `minmax` value is the smallest slider range allowed (i.e. the
  minimum maximum value). This should generally be set to 1.3 * the UK average
  for that value.

- Each calculator also includes 'about' info, that we use to explain our
  sources, methods and assumptions to the user. Make sure to edit this when you
  edit the values.

## To do:

- [ ] Improve documentation
  - [ ] Improve calculation explanations
  - [ ] Add intro notification (inc. aims)
- [x] Add more emission factors
- [ ] Publish
