<script>
    import DayInfoCard from "./DayInfoCard.svelte";

    export let date = {
        month: 5,
        day: 25, 
        year: 2023,
        actions: [
            {
                name: "Sleep",
                start: "10:30 PM",
                end: "7:00 AM",
                project_name: "",
                color: "#F7464A", // red
                hover_color: "#FF5A5E",
            },

            {
                name: "School",
                start: "8:00 AM",
                end: "3:00 PM",
                project_name: "",
                color: "#46BFBD", // green
                hover_color: "#5AD3D1",
            }, 

            {
                name: "Track Practice",
                start: "4:00 PM",
                end: "6:00 PM",
                project_name: "Athletics",
                color: "#FDB45C", // yellow
                hover_color: "#FFC870",
            }
        ]
    }

</script>


<DayInfoCard dateInfo={date}/>