 $(function () {
                $('#datetimepicker5').datetimepicker({
                    defaultDate: "04/1/2017",
                    disabledDates: [
                        moment("05/25/2017"),
                        new Date(2017, 04 - 1, 21),
                        "04/22/2017 00:53"
                    ]
                });
            });