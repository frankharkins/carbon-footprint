# Carbon footprint calculator

This is a simple project to help me learn web development with [Svelte](https://svelte.dev/).

## Motivation

Lots of people are willing to make lifestyle changes to reduce their carbon
footprint, but can't easily _quantify_ the impact these changes. I believe this
leads to well-meaning people worrying about largely inconsequential changes
(e.g. turning lights off obsessively), and/or attempting a large number of
lifestyle changes, which is stressful difficult to maintain.

Secondly, the most important lesson from a carbon footprint calculator is what
you can _change_ to make a difference. Most calculators I've tried do not allow
you to see how different changes affect your footprint; you usually need to
re-take the full test.

We should be encouraging people to make the changes with the highest
impact-to-effort ratio. A single change is much easier to manage, and in many
cases can have a dramatic impact.

## Contributing

### Running locally

To run locally, first clone the repo, then:

```
cd carbon-footprint
npm install
npm run dev
```

To deploy, locally run `./deploy.sh` (you'll need to be on `main` and stash any changes first).

### Editing the calculator

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
  - grams for mass,
  - kWh for energy.

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
