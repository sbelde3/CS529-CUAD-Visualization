function getRandomData(ordinal = false) {

    const NGROUPS = 6,
        MAXLINES = 5,
        MAXSEGMENTS = 5,
        MAXCATEGORIES = 4,
        MINTIME = new Date(2013,2,21);

    //const nCategories = Math.ceil(Math.random()*MAXCATEGORIES),
    const nCategories = 5,
        categoryLabels = ['Contract Signing Period','Contract Negotiation Period','Contract Re-Negotiation Period','Contract Relapse Period','Contract Expiry Period'];

    console.log([...Array(NGROUPS).keys()].map(i => ({
        group: 'group' + (i+1),
        data: getGroupData()
    })))

    return [...Array(NGROUPS).keys()].map(i => ({
        group: 'Group ' + (i+1),
        data: getGroupData()
    }));
    

    //

    function getGroupData() {

        return [...Array(Math.ceil(Math.random()*MAXLINES)).keys()].map(i => ({
            label: 'Contract ID ' + (i+1),
            data: getSegmentsData()
        }));

        //

        function getSegmentsData() {
            const nSegments = Math.ceil(Math.random()*MAXSEGMENTS),
                segMaxLength = Math.round(((new Date())-MINTIME)/nSegments);
            let runLength = MINTIME;

            return [...Array(nSegments).keys()].map(i => {
                const tDivide = [Math.random(), Math.random()].sort(),
                    start = new Date(runLength.getTime() + tDivide[0]*segMaxLength),
                    end = new Date(runLength.getTime() + tDivide[1]*segMaxLength);

                runLength = new Date(runLength.getTime() + segMaxLength);

                return {
                    timeRange: [start, end],
                    val: ordinal ? categoryLabels[Math.ceil(Math.random()*nCategories)] : Math.random()
                    //labelVal: is optional - only displayed in the labels
                };
            });

        }
    }
}
