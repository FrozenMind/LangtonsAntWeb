class RuleSet {
	constructor(){
		this.rules = []
		this.rule_id_counter = 0
	}
	
	add(fromColor, toColor, turn){
		this.rules.push({
			id: this.rule_id_counter,
			from_color: fromColor,
			to_color: toColor,
			turn: turn
		})
	}
	
	remove(id){
		
	}
}
