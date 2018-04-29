# LangtonsAntWeb
LangtonsAntWeb made for Browsers made with CreateJs.

The special thing is you can create custom rules to create a lot of different creations.

To have something started I added the rules for the classic control and a algorithm to create random rules everytime it restarts.

## Control
* P: pause / play
* R: reastart
* +: faster
* -: slower
* B: toggle background black/white

## Rule Creation
Find the function ```loadRules()```. It contains a ```rule_set``` array where you can add all your rules.

Then add rules like:

```JavaScript
rule_set.add("white", "black", "r")
rule_set.add("black", "white", "l")
```

## nice_rules.txt
This file contains a view rules i found, which looks really nice

You can use these rules like:
```JavaScript
rule_set = [
  {
    "id":0,
    "from_color":"white",
    "to_color":"black",
    "turn":"r"
  },
  {
    "id":0,
    "from_color":"black",
    "to_color":"white",
    "turn":"l"
  }
]
```

