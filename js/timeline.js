function get_data2(){

  var Group = [{group:"Marketing", data: getGroupData(0)},{group:"Video", data: getGroupData(1)},{group:"Content", data: getGroupData(2)},{group:"Website", data: getGroupData(3)}]
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
            categoryLabels = ['Contract_Signing','Contract_Negotiation','Contract_Re_Negotiation','Contract_Relapse','Contract_Expiry'];

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
    console.log(get_data())

    // data_grp =  [...Array(NGROUPS).keys()].map(i => ({
    //      group: 'Group ' + (i+1),
    //      data: getGroupData()
    //  }));

    // return [...Array(NGROUPS).keys()].map(i => ({
    //     group: 'Group ' + (i+1),
    //     data: getGroupData(i)
    // }));

    return [
    {
        "group": "Marketing",
        "data": [
            {
                "label": "Contract ID 1",
                "data": [
                    {
                        "timeRange": [
                            "2017-07-26T18:42:20.801Z",
                            "2019-04-04T19:17:49.425Z"
                        ],
                        "val": "Contract_Expiry"
                    }
                ]
            },
            {
                "label": "Contract ID 2",
                "data": [
                    {
                        "timeRange": [
                            "2013-05-10T12:36:00.810Z",
                            "2014-02-20T22:59:52.535Z"
                        ],
                        "val": "Contract_Signing"
                    },
                    {
                        "timeRange": [
                            "2017-10-09T06:49:18.815Z",
                            "2019-07-06T07:38:18.526Z"
                        ],
                        "val": "Contract_Signing"
                    },
                    {
                        "timeRange": [
                            "2020-06-18T23:56:27.020Z",
                            "2020-09-04T22:02:59.178Z"
                        ],
                        "val": "Contract_Re_Negotiation"
                    }
                ]
            },
            {
                "label": "Contract ID 3",
                "data": [
                    {
                        "timeRange": [
                            "2013-10-02T15:08:15.986Z",
                            "2016-04-07T02:42:37.128Z"
                        ],
                        "val": "Contract_Expiry"
                    },
                    {
                        "timeRange": [
                            "2016-08-24T17:02:22.924Z",
                            "2019-05-07T22:53:58.106Z"
                        ],
                        "val": "Contract_Relapse"
                    },
                    {
                        "timeRange": [
                            "2019-12-21T22:29:47.431Z",
                            "2020-09-16T15:21:08.003Z"
                        ],
                        "val": "Contract_Negotiation"
                    }
                ]
            }
        ]
    },
    {
        "group": "Video",
        "data": [
            {
                "label": "Contract ID 1",
                "data": [
                    {
                        "timeRange": [
                            "2013-05-22T05:07:25.465Z",
                            "2014-06-20T03:23:33.597Z"
                        ],
                        "val": "Contract_Expiry"
                    },
                    {
                        "timeRange": [
                            "2016-08-04T07:13:16.582Z",
                            "2016-12-10T23:40:28.602Z"
                        ],
                        "val": "Contract_Signing"
                    },
                    {
                        "timeRange": [
                            "2017-06-22T05:03:31.420Z",
                            "2018-01-10T15:05:23.862Z"
                        ],
                        "val": "Contract_Signing"
                    },
                    {
                        "timeRange": [
                            "2019-10-24T07:49:55.910Z",
                            "2020-04-22T03:55:35.175Z"
                        ],
                        "val": "Contract_Re_Negotiation"
                    },
                    {
                        "timeRange": [
                            "2021-05-22T04:49:04.620Z",
                            "2022-02-09T21:10:10.982Z"
                        ],
                        "val": "Contract_Signing"
                    }
                ]
            },
            {
                "label": "Contract ID 2",
                "data": [
                    {
                        "timeRange": [
                            "2014-01-07T07:52:53.285Z",
                            "2015-01-14T04:45:41.740Z"
                        ],
                        "val": "Contract_Negotiation"
                    },
                    {
                        "timeRange": [
                            "2016-09-07T15:57:56.122Z",
                            "2017-08-20T15:33:36.490Z"
                        ],
                        "val": "Contract_Expiry"
                    },
                    {
                        "timeRange": [
                            "2021-01-06T19:13:46.625Z",
                            "2021-10-22T18:40:47.484Z"
                        ],
                        "val": "Contract_Expiry"
                    }
                ]
            },
            {
                "label": "Contract ID 3",
                "data": [
                    {
                        "timeRange": [
                            "2014-07-24T09:42:57.842Z",
                            "2016-01-08T13:08:56.675Z"
                        ],
                        "val": "Contract_Re_Negotiation"
                    },
                    {
                        "timeRange": [
                            "2018-01-23T11:42:54.946Z",
                            "2019-12-27T04:10:14.600Z"
                        ],
                        "val": "Contract_Expiry"
                    }
                ]
            },
            {
                "label": "Contract ID 4",
                "data": [
                    {
                        "timeRange": [
                            "2013-03-26T13:57:28.617Z",
                            "2015-02-18T22:46:40.368Z"
                        ],
                        "val": "Contract_Negotiation"
                    },
                    {
                        "timeRange": [
                            "2015-09-24T23:29:27.988Z",
                            "2017-01-26T07:18:57.369Z"
                        ],
                        "val": "Contract_Relapse"
                    },
                    {
                        "timeRange": [
                            "2017-06-14T10:09:28.537Z",
                            "2017-11-27T13:34:06.248Z"
                        ],
                        "val": "Contract_Signing"
                    },
                    {
                        "timeRange": [
                            "2020-05-22T03:37:34.111Z",
                            "2020-11-29T06:02:07.348Z"
                        ],
                        "val": "Contract_Relapse"
                    },
                    {
                        "timeRange": [
                            "2021-05-12T20:19:14.223Z",
                            "2021-12-30T18:18:06.473Z"
                        ],
                        "val": "Contract_Negotiation"
                    }
                ]
            }
        ]
    },
    {
        "group": "Content",
        "data": [
            {
                "label": "Contract ID 1",
                "data": [
                    {
                        "timeRange": [
                            "2014-06-16T13:56:05.116Z",
                            "2015-02-22T22:12:25.071Z"
                        ],
                        "val": "Contract_Expiry"
                    },
                    {
                        "timeRange": [
                            "2016-12-31T23:27:03.980Z",
                            "2017-10-07T02:44:48.041Z"
                        ],
                        "val": "Contract_Signing"
                    },
                    {
                        "timeRange": [
                            "2020-01-30T17:30:21.000Z",
                            "2021-07-24T05:01:53.334Z"
                        ],
                        "val": "Contract_Negotiation"
                    }
                ]
            },
            {
                "label": "Contract ID 2",
                "data": [
                    {
                        "timeRange": [
                            "2014-11-26T19:01:03.783Z",
                            "2015-03-06T23:30:03.533Z"
                        ],
                        "val": "Contract_Relapse"
                    },
                    {
                        "timeRange": [
                            "2017-05-15T03:37:35.890Z",
                            "2018-04-27T13:51:51.679Z"
                        ],
                        "val": "Contract_Relapse"
                    },
                    {
                        "timeRange": [
                            "2021-10-25T11:20:18.147Z",
                            "2021-12-30T06:20:31.452Z"
                        ],
                        "val": "Contract_Relapse"
                    }
                ]
            },
            {
                "label": "Contract ID 3",
                "data": [
                    {
                        "timeRange": [
                            "2013-08-13T23:20:56.869Z",
                            "2015-04-05T01:10:32.486Z"
                        ],
                        "val": "Contract_Re_Negotiation"
                    },
                    {
                        "timeRange": [
                            "2017-06-13T00:49:38.923Z",
                            "2018-09-29T01:33:09.188Z"
                        ],
                        "val": "Contract_Negotiation"
                    },
                    {
                        "timeRange": [
                            "2020-07-28T11:15:56.853Z",
                            "2022-08-20T10:07:44.712Z"
                        ],
                        "val": "Contract_Re_Negotiation"
                    }
                ]
            },
            {
                "label": "Contract ID 4",
                "data": [
                    {
                        "timeRange": [
                            "2017-07-05T14:18:45.126Z",
                            "2017-10-10T18:19:35.078Z"
                        ],
                        "val": "Contract_Signing"
                    },
                    {
                        "timeRange": [
                            "2020-03-12T11:12:34.851Z",
                            "2020-06-30T17:25:01.744Z"
                        ],
                        "val": "Contract_Expiry"
                    }
                ]
            },
            {
                "label": "Contract ID 5",
                "data": [
                    {
                        "timeRange": [
                            "2014-03-02T21:59:51.150Z",
                            "2016-02-22T20:24:49.826Z"
                        ],
                        "val": "Contract_Signing"
                    },
                    {
                        "timeRange": [
                            "2016-07-28T05:18:06.380Z",
                            "2017-02-09T15:08:34.104Z"
                        ],
                        "val": "Contract_Negotiation"
                    },
                    {
                        "timeRange": [
                            "2020-10-19T12:37:52.206Z",
                            "2021-10-03T05:00:21.765Z"
                        ],
                        "val": "Contract_Negotiation"
                    }
                ]
            }
        ]
    },
    {
        "group": "Website",
        "data": [
            {
                "label": "Contract ID 1",
                "data": [
                    {
                        "timeRange": [
                            "2020-02-17T15:44:42.146Z",
                            "2022-10-10T17:29:11.768Z"
                        ],
                        "val": "Contract_Negotiation"
                    }
                ]
            },
            {
                "label": "Contract ID 2",
                "data": [
                    {
                        "timeRange": [
                            "2013-09-19T04:42:20.479Z",
                            "2017-10-31T08:00:27.682Z"
                        ],
                        "val": "Contract_Expiry"
                    },
                    {
                        "timeRange": [
                            "2019-05-19T16:26:08.168Z",
                            "2020-03-30T07:18:04.555Z"
                        ],
                        "val": "Contract_Negotiation"
                    }
                ]
            }
        ]
    }
]
;

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
          categoryLabels = ['Contract_Signing','Contract_Negotiation','Contract_Re_Negotiation','Contract_Relapse','Contract_Expiry'];

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
