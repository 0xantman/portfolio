import Vue from 'vue';
import { ValidationProvider, extend } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import fr from 'vee-validate/dist/locale/fr';

// loop over all rules
for (let rule in rules) {
  extend(rule, {
    ...rules[rule], // add the rule
    message: fr.messages[rule] // add its message
  });
}

// loop over all rules
for (let rule in rules) {
  // add the rule
  extend(rule, rules[rule]);
}