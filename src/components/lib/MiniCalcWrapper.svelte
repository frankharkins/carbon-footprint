<script>
	import { appState } from '../../state.js';
	import Dropdown from './Dropdown.svelte';
	import NumberInput from './NumberInput.svelte';
	import Panel from './Panel.svelte';
	import PanelFooter from './PanelFooter.svelte';
	export let name;
	export let min_width = "300px";
	let unlocked = false;
	
	function get_panel_state(appState) {
		if (appState === name) {
			unlocked = true;
			return 'required';
		} else if (unlocked) {
			return 'active';
			} else {
			return 'hidden';
		}
	};
	
	$: panelState = get_panel_state($appState);

</script>

<Panel min_width={min_width} state={panelState}>
	<slot></slot>
	<PanelFooter name={name}/>
</Panel>
