<script>
    import InfoCardLegend from "./InfoCardLegend.svelte";
    import { formatDuration } from "./DataConfig.js";
    export let dateActivities;
    
</script>



<div>
    {#each dateActivities as d}
    <InfoCardLegend title={d.name} color={d.color} duration={formatDuration(d)}/>
    {/each}
</div>