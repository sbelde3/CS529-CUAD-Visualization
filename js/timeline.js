function get_data2(){

  var Group = [{group:"Marketing Affiliated", data: getGroupData(0)},{group:"Video on Demand", data: getGroupData(1)},{group:"Content Distribution License", data: getGroupData(2)},{group:"Website Content License", data: getGroupData(3)}]
  //console.log(Group)
  return Group

  function getGroupData(j) {

    arr_max = [0.6,0.7,0.9,0.4]

    const NGROUPS = 4,
        MAXLINES = 5,
        MAXSEGMENTS = 5,
        MAXCATEGORIES = 4,
        MINTIME = new Date(2013,2,21);

        const nCategories = 5,
            categoryLabels = ['Contract Signing Period','Contract Negotiation Period','Contract Re-Negotiation Period','Contract Relapse Period','Contract Expiry Period'];

        ordinal = true

      return [...Array(Math.ceil(arr_max[j]*MAXLINES)).keys()].map(i => ({
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
                  val: ordinal ? categoryLabels[Math.floor(Math.random()*nCategories)] : Math.random()
                  //labelVal: is optional - only displayed in the labels
              };
          });

      }
  }
}

function get_data(){

  var Group = [{group:"Marketing Affiliated", data: []},{group:"Video on Demand", data: []},{group:"Content Distribution License", data: []},{group:"Website Content License", data: []}]
  d3.csv("data/Contracts_timeline.csv", function(data) {

      grp_name = data.Group
      if(grp_name == "Marketing Affiliated"){

        [month, day, year] = data.Contract_Signing_std.split('/');
        s_std = new Date(+year, month - 1, +day);

        [month, day, year] = data.Contract_Signing_Ed.split('/');
        s_ed = new Date(+year, month - 1, +day);


        [month, day, year] = data.Contract_Negotiation_std.split('/');
        n_std = new Date(+year, month - 1, +day);

        [month, day, year] = data.Contract_Negotiation_Ed.split('/');
        n_ed = new Date(+year, month - 1, +day);

        [month, day, year] = data.Contract_Re_Negotiation_Std.split('/');
        rn_std = new Date(+year, month - 1, +day);

        [month, day, year] = data.Contract_Re_Negotiation_Ed.split('/');
        rn_ed = new Date(+year, month - 1, +day);

        [month, day, year] = data.Contract_Relapse_std.split('/');
        rl_std = new Date(+year, month - 1, +day);

        [month, day, year] = data.Contract_Relapse_ed.split('/');
        rl_ed = new Date(+year, month - 1, +day);

        [month, day, year] = data.Contract_Expiry_std.split('/');
        e_std = new Date(+year, month - 1, +day);

        [month, day, year] = data.Contract_Expiry_ed.split('/');
        e_ed = new Date(+year, month - 1, +day);

        //console.log(s_std)
        //s_std = new Date(data.Contract_Signing_std)
        //s_ed = new Date(data.Contract_Signing_Ed)

        // n_std = new Date(data.Contract_Negotiation_std)
        // n_ed = new Date(data.Contract_Negotiation_Ed)

        //rn_std = new Date(data.Contract_Re_Negotiation_Std)
        //rn_ed = new Date(data.Contract_Re_Negotiation_Ed)

        //rl_std = new Date(data.Contract_Relapse_std)
        //rl_ed = new Date(data.Contract_Relapse_ed)

        //e_std = new Date(data.Contract_Expiry_std)
        //e_ed = new Date(data.Contract_Expiry_ed)


        data_add = {
                      label : data.ID,
                      data : [
                                {
                                  timeRange: [s_std, s_ed],
                                  val: "Contract_Signing"
                                },

                                {
                                  timeRange: [n_std, n_ed],
                                  val: "Contract_Negotiation"
                                },

                                {
                                  timeRange: [rn_std, rn_ed],
                                  val: "Contract_Re_Negotiation"
                                },

                                {
                                  timeRange: [rl_std, rl_ed],
                                  val: "Contract_Relapse"
                                },

                                {
                                  timeRange: [e_std, e_ed],
                                  val: "Contract_Expiry"
                                },
                              ]
                    }
          Group[0].data.push(data_add);
      }

      else if(grp_name == "Video on Demand"){

        [month, day, year] = data.Contract_Signing_std.split('/');
        s_std = new Date(+year, month - 1, +day);

        [month, day, year] = data.Contract_Signing_Ed.split('/');
        s_ed = new Date(+year, month - 1, +day);


        [month, day, year] = data.Contract_Negotiation_std.split('/');
        n_std = new Date(+year, month - 1, +day);

        [month, day, year] = data.Contract_Negotiation_Ed.split('/');
        n_ed = new Date(+year, month - 1, +day);

        [month, day, year] = data.Contract_Re_Negotiation_Std.split('/');
        rn_std = new Date(+year, month - 1, +day);

        [month, day, year] = data.Contract_Re_Negotiation_Ed.split('/');
        rn_ed = new Date(+year, month - 1, +day);

        [month, day, year] = data.Contract_Relapse_std.split('/');
        rl_std = new Date(+year, month - 1, +day);

        [month, day, year] = data.Contract_Relapse_ed.split('/');
        rl_ed = new Date(+year, month - 1, +day);

        [month, day, year] = data.Contract_Expiry_std.split('/');
        e_std = new Date(+year, month - 1, +day);

        [month, day, year] = data.Contract_Expiry_ed.split('/');
        e_ed = new Date(+year, month - 1, +day);

        //console.log(s_std)
        //s_std = new Date(data.Contract_Signing_std)
        //s_ed = new Date(data.Contract_Signing_Ed)

        // n_std = new Date(data.Contract_Negotiation_std)
        // n_ed = new Date(data.Contract_Negotiation_Ed)

        //rn_std = new Date(data.Contract_Re_Negotiation_Std)
        //rn_ed = new Date(data.Contract_Re_Negotiation_Ed)

        //rl_std = new Date(data.Contract_Relapse_std)
        //rl_ed = new Date(data.Contract_Relapse_ed)

        //e_std = new Date(data.Contract_Expiry_std)
        //e_ed = new Date(data.Contract_Expiry_ed)


        data_add = {
                      label : data.ID,
                      data : [
                                {
                                  timeRange: [s_std, s_ed],
                                  val: "Contract_Signing"
                                },

                                {
                                  timeRange: [n_std, n_ed],
                                  val: "Contract_Negotiation"
                                },

                                {
                                  timeRange: [rn_std, rn_ed],
                                  val: "Contract_Re_Negotiation"
                                },

                                {
                                  timeRange: [rl_std, rl_ed],
                                  val: "Contract_Relapse"
                                },

                                {
                                  timeRange: [e_std, e_ed],
                                  val: "Contract_Expiry"
                                },
                              ]
                    }
          Group[1].data.push(data_add);
      }
      else if(grp_name == "Content Distribution License"){

        [month, day, year] = data.Contract_Signing_std.split('/');
        s_std = new Date(+year, month - 1, +day);

        [month, day, year] = data.Contract_Signing_Ed.split('/');
        s_ed = new Date(+year, month - 1, +day);


        [month, day, year] = data.Contract_Negotiation_std.split('/');
        n_std = new Date(+year, month - 1, +day);

        [month, day, year] = data.Contract_Negotiation_Ed.split('/');
        n_ed = new Date(+year, month - 1, +day);

        [month, day, year] = data.Contract_Re_Negotiation_Std.split('/');
        rn_std = new Date(+year, month - 1, +day);

        [month, day, year] = data.Contract_Re_Negotiation_Ed.split('/');
        rn_ed = new Date(+year, month - 1, +day);

        [month, day, year] = data.Contract_Relapse_std.split('/');
        rl_std = new Date(+year, month - 1, +day);

        [month, day, year] = data.Contract_Relapse_ed.split('/');
        rl_ed = new Date(+year, month - 1, +day);

        [month, day, year] = data.Contract_Expiry_std.split('/');
        e_std = new Date(+year, month - 1, +day);

        [month, day, year] = data.Contract_Expiry_ed.split('/');
        e_ed = new Date(+year, month - 1, +day);

        //console.log(s_std)
        //s_std = new Date(data.Contract_Signing_std)
        //s_ed = new Date(data.Contract_Signing_Ed)

        // n_std = new Date(data.Contract_Negotiation_std)
        // n_ed = new Date(data.Contract_Negotiation_Ed)

        //rn_std = new Date(data.Contract_Re_Negotiation_Std)
        //rn_ed = new Date(data.Contract_Re_Negotiation_Ed)

        //rl_std = new Date(data.Contract_Relapse_std)
        //rl_ed = new Date(data.Contract_Relapse_ed)

        //e_std = new Date(data.Contract_Expiry_std)
        //e_ed = new Date(data.Contract_Expiry_ed)


        data_add = {
                      label : data.ID,
                      data : [
                                {
                                  timeRange: [s_std, s_ed],
                                  val: "Contract_Signing"
                                },

                                {
                                  timeRange: [n_std, n_ed],
                                  val: "Contract_Negotiation"
                                },

                                {
                                  timeRange: [rn_std, rn_ed],
                                  val: "Contract_Re_Negotiation"
                                },

                                {
                                  timeRange: [rl_std, rl_ed],
                                  val: "Contract_Relapse"
                                },

                                {
                                  timeRange: [e_std, e_ed],
                                  val: "Contract_Expiry"
                                },
                              ]
                    }
          Group[2].data.push(data_add);
      }
      else if(grp_name == "Website Content License"){

        [month, day, year] = data.Contract_Signing_std.split('/');
        s_std = new Date(+year, month - 1, +day);

        [month, day, year] = data.Contract_Signing_Ed.split('/');
        s_ed = new Date(+year, month - 1, +day);


        [month, day, year] = data.Contract_Negotiation_std.split('/');
        n_std = new Date(+year, month - 1, +day);

        [month, day, year] = data.Contract_Negotiation_Ed.split('/');
        n_ed = new Date(+year, month - 1, +day);

        [month, day, year] = data.Contract_Re_Negotiation_Std.split('/');
        rn_std = new Date(+year, month - 1, +day);

        [month, day, year] = data.Contract_Re_Negotiation_Ed.split('/');
        rn_ed = new Date(+year, month - 1, +day);

        [month, day, year] = data.Contract_Relapse_std.split('/');
        rl_std = new Date(+year, month - 1, +day);

        [month, day, year] = data.Contract_Relapse_ed.split('/');
        rl_ed = new Date(+year, month - 1, +day);

        [month, day, year] = data.Contract_Expiry_std.split('/');
        e_std = new Date(+year, month - 1, +day);

        [month, day, year] = data.Contract_Expiry_ed.split('/');
        e_ed = new Date(+year, month - 1, +day);

        //console.log(s_std)
        //s_std = new Date(data.Contract_Signing_std)
        //s_ed = new Date(data.Contract_Signing_Ed)

        // n_std = new Date(data.Contract_Negotiation_std)
        // n_ed = new Date(data.Contract_Negotiation_Ed)

        //rn_std = new Date(data.Contract_Re_Negotiation_Std)
        //rn_ed = new Date(data.Contract_Re_Negotiation_Ed)

        //rl_std = new Date(data.Contract_Relapse_std)
        //rl_ed = new Date(data.Contract_Relapse_ed)

        //e_std = new Date(data.Contract_Expiry_std)
        //e_ed = new Date(data.Contract_Expiry_ed)


        data_add = {
                      label : data.ID,
                      data : [
                                {
                                  timeRange: [s_std, s_ed],
                                  val: "Contract_Signing"
                                },

                                {
                                  timeRange: [n_std, n_ed],
                                  val: "Contract_Negotiation"
                                },

                                {
                                  timeRange: [rn_std, rn_ed],
                                  val: "Contract_Re_Negotiation"
                                },

                                {
                                  timeRange: [rl_std, rl_ed],
                                  val: "Contract_Relapse"
                                },

                                {
                                  timeRange: [e_std, e_ed],
                                  val: "Contract_Expiry"
                                },
                              ]
                    }
          Group[3].data.push(data_add);
      }




  });
  //console.log(Group)
  return Group
}

function getRandomData(ordinal = false) {

    arr_max = [0.6,0.7,0.9,0.4]

    const NGROUPS = 4,
        MAXLINES = 5,
        MAXSEGMENTS = 5,
        MAXCATEGORIES = 4,
        MINTIME = new Date(2013,2,21);

    //const nCategories = Math.ceil(Math.random()*MAXCATEGORIES),
    const nCategories = 5,
        categoryLabels = ['Contract Signing Period','Contract Negotiation Period','Contract Re-Negotiation Period','Contract Relapse Period','Contract Expiry Period'];

    console.log([...Array(NGROUPS).keys()].map(i => ({
        group: 'group' + (i+1),
        data: getGroupData(i)
    })))

    //console.log(get_data())
    data_grp = get_data2()
    console.log(data_grp)

    // data_grp =  [...Array(NGROUPS).keys()].map(i => ({
    //      group: 'Group ' + (i+1),
    //      data: getGroupData()
    //  }));

    // return [...Array(NGROUPS).keys()].map(i => ({
    //     group: 'Group ' + (i+1),
    //     data: getGroupData(i)
    // }));

    return data_grp;

    //

    function getGroupData(j) {

        return [...Array(Math.ceil(arr_max[j]*MAXLINES)).keys()].map(i => ({
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



function getGroupData(j) {

  arr_max = [0.6,0.7,0.9,0.4]

  const NGROUPS = 4,
      MAXLINES = 5,
      MAXSEGMENTS = 5,
      MAXCATEGORIES = 4,
      MINTIME = new Date(2013,2,21);

      const nCategories = 5,
          categoryLabels = ['Contract Signing Period','Contract Negotiation Period','Contract Re-Negotiation Period','Contract Relapse Period','Contract Expiry Period'];

      ordinal = true

    return [...Array(Math.ceil(arr_max[j]*MAXLINES)).keys()].map(i => ({
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
