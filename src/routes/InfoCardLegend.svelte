<script>
    export let color;
    export let title;
    export let duration;
</script>


<style>
    .box {
        width: 20px;
        height: 20px;
        border-radius: 3px;
        display: inline;
        /* margin-right: clamp(15px, 10dvw, 50px); */
        margin-right: clamp(10px, 0.5dvw, 30px);
    }

    .legend-title {
        font-family: "Inter", sans-serif;
    }

    .legend {

        display: flex;
        margin-top: clamp(10px, 1.5vh, 15px);
        flex-direction: row;
        height: fit-content;
        align-items: center;
    }
</style>


<div class="legend">
    <div class="box" style="background: {color}"></div>
    <p class="legend-title">{title} — {duration}</p>
</div>