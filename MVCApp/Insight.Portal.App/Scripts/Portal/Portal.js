if (typeof (irp) == "undefined") {
    irp = function () {

        var getAjaxData = function (url, ajaxParams, callback, callbackParams) {
            $.ajax({
                url: url,
                cache: false,
                data: ajaxParams,
                success: function (data) {
                    callback(data, callbackParams);
                },
                error: onError
            });
        };

        var postAjaxData = function (url, ajaxParams, callback, callbackParams) {
            $.ajax({
                type: "POST",
                url: url,
                data: ajaxParams,
                success: function (data) {
                    callback(data, callbackParams);
                },
                error: onError
            });
        };

        var onError = function (xhr, errorType, exception) {
            var div = document.getElementById("divModelErrorContent");
            if (!div) {
                var divModal = ' <div class="modal fade" id="divModelErrorContent">'
                + '<div class="modal-dialog">'
                   + ' <div class="modal-content">'
                        + '<div class="modal-header modal-header-colored">'
                            + '<button type="button" class="close" data-dismiss="modal">&times;</button>'
                            + '<h4 class="modal-title" id="divModelErrorContentTitle"></h4>'
                        + '</div>'
                        + '<div class="modal-body" id="divModelErrorContentBody">'
                        + '</div>'
                    + '</div>'
                + '</div>'
            + '</div>'

                $("body").prepend(divModal);
            }
            var responseText, errorInfo = '';
            errorInfo = xhr.responseText;
            $('.modal-content').css('max-height', $(window).height() / 2 + 'px');
            $('.modal-body').css('max-height', ($(window).height() / 2) - 80 + 'px');
            $('.modal-body').css('overflow-y', 'scroll');
            $('#divModelErrorContentTitle').html(errorType);
            $('#divModelErrorContentBody').html(errorInfo);
            $('#divModelErrorContent').modal('show');
        };
        // Menu related functions ----------------------------------------------------------------
        var menus = {
            "employeesMenuData": '[' +
                    '{"title": "Attendance", "link": "/Attendance" },' +
                    '{"title": "Worklog", "link": "/Worklog" },' +
                    '{"title": "Leaves", "link": "/Employees/Leaves" },' +
                    '{"title": "Holidays", "link": "/Employees/Holidays" },' +
                    '{"title": "Tax Savings", "link": "/Employees/TaxSavings" }' +
            ']',

            "projectsMenuData": '[' +
                    '{"title": "Dashboard", "link": "/Projects" },' +
                    '{"title": "Tasks", "link": "/Tasks" },' +
                    '{"title": "DB Scripts", "link": "/DBScripts" },' +
                    '{"title": "Versions", "link": "/Versions" },' +
                    '{"title": "separator", "link": "separator" },' +
                    '{"title": "Release Notes", "link": "/ReleaseNotes" },' +
                    '{"title": "Deployment", "link": "/Deployment" },' +
                    '{"title": "Files", "link": "/Files" }' +
            ']',

            "adminMenuData": '[' +
                    '{"title": "Users", "link": "/Account" },' +
                    '{"title": "Employees", "link": "/Employees" },' +
                    '{"title": "Projects", "link": "/Admin/Projects" },' +
                    '{"title": "separator", "link": "separator" },' +
                    '{"title": "Attendance Report", "link": "/Attendance/AttendanceReport" },' +
                    '{"title": "Leave Report", "link": "/Employees/LeaveReport" },' +
                    '{"title": "Email Templates", "link": "/Admin/EmailTemplates" },' +
                    '{"title": "Containers", "link": "/Files/Containers" },' +
                     '{"title": "Holidays", "link": "/Employees/ManageHolidays" },' +
                     '{"title": "Tax Saving Types", "link": "/Employees/ManageTaxSavingTypes" }' +
           ']',

            "homeMenuData": '[' +
                    '{"title": "Home", "link": "Home/Index" }' +
           ']'
        }

        var prepareSectionMenu = function (section) {
            $("#nav-" + section).addClass("active");
            var parsedData = JSON.parse(menus[section + "MenuData"]);
            $("#sectionMenuDropdown").html($("#sectionMenuDropdownTemplate").render(parsedData));
            $("#sectionMenuDropdown1").html($("#sectionMenuDropdownTemplate1").render(parsedData));
        };

        var formatJSDateToCsharpDate = function (date) {
            var month = '' + (date.getMonth() + 1),
                day = '' + date.getDate(),
                year = date.getFullYear();
            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;
            return [year, month, day].join('-');
        };

        var formatCsharpDateToDatePicker = function (cSharpDate) {
            var date = new Date(cSharpDate)
            var month = '' + (date.getMonth() + 1),
               day = '' + date.getDate(),
               year = date.getFullYear();
            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;
            return [day, month, year].join('/');
        };

        var formatDatePickerToCsharpDate = function (date) {
            var datePicker = date.split('/');
            var month = '' + (datePicker[1]),
                day = '' + datePicker[0],
                year = '' + datePicker[2];
            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;
            return [year, month, day].join('-');
        };

        var formatJSDateToDatePicker = function (date) {
            var month = '' + (date.getMonth() + 1),
                day = '' + date.getDate(),
                year = date.getFullYear();
            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;
            return [day, month, year].join('/');
        };

        var formatJSDateIntoMonthYear = function (date) {
            var monthNames = [
             "January", "February", "March",
             "April", "May", "June", "July",
             "August", "September", "October",
             "November", "December"
            ];
            var monthIndex = date.getMonth();
            var year = date.getFullYear();
            return monthNames[monthIndex] + ", " + year;
        };

        var formatJsDatetoMMddYYYY = function (date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();
            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;
            return [month, day, year].join('-');
        };

        var getDateFormat = function (utcDate) {
            if (utcDate == '' || utcDate == undefined) { return ''; }
            var formattedDate = new Date(utcDate);
            var monthNames = [
              "Jan", "Feb", "Mar",
              "Apr", "May", "Jun", "Jul",
              "Aug", "Sep", "Oct",
              "Nov", "Dec"
            ];
            var day = (formattedDate.getDate() < 10) ? "0" + formattedDate.getDate() : formattedDate.getDate();
            var monthIndex = formattedDate.getMonth();
            var year = formattedDate.getFullYear();
            var hour;
            if (formattedDate.getHours() > 12) {
                hour = formattedDate.getHours() - 12;
                hour = (hour < 10) ? "0" + hour : hour;
            } else {
                hour = (formattedDate.getHours() < 10) ? "0" + formattedDate.getHours() : formattedDate.getHours();
            }
            var minute = (formattedDate.getMinutes() < 10) ? "0" + formattedDate.getMinutes() : formattedDate.getMinutes();
            var second = (formattedDate.getSeconds() < 10) ? "0" + formattedDate.getSeconds() : formattedDate.getSeconds();
            return day + '-' + monthNames[monthIndex] + '-' + year + ' ' + hour + ':' + minute + ':' + second + ' ' + ((formattedDate.getHours() >= 12) ? 'PM' : 'AM');
        };

        var getCookie = function (cName) {
            var i, x, y, cookies = document.cookie.split(";");
            for (i = 0; i < cookies.length; i++) {
                x = cookies[i].substr(0, cookies[i].indexOf("="));
                y = cookies[i].substr(cookies[i].indexOf("=") + 1);
                x = x.replace(/^\s+|\s+$/g, "");
                if (x == cName) {
                    return unescape(y);
                }
            }
            return '';
        };
        var setCookie = function (cName, value, days) {
            var expires = '';
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toGMTString();
            }
            document.cookie = cName + "=" + value + expires + "; path=/";
        };
        var deleteCookie = function (cName) {
            document.cookie = cName + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        };
        var addValidation = function (element, ValidationMessage) {
            $('#warning' + element).removeClass('hidden');
            $('#grp' + element).addClass('has-error');
            if (ValidationMessage) {
                $('#warning' + element).html(ValidationMessage);
            }
        };

        var removeValidation = function (element) {
            $('#warning' + element).addClass('hidden');
            $('#grp' + element).removeClass('has-error');
        };

        var findString = function (data, searchString) {
            if (data != null) {
                return data.toString().toLowerCase().indexOf(searchString) != -1;
            }
            return false;
        };

        var htmlEncode = function (value) {
            return !value ? value : String(value).replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
        };
        var htmlDecode = function (value) {
            return !value ? value : String(value).replace(/&amp;/g, "&").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"');
        };

        var getProjectCookie = function (projectId) {
            return getCookie("SelectedProject");
        };

        var setProjectCookie = function (projectId) {
            setCookie("SelectedProject", projectId, 365);
        };

        var getComponentCookie = function () {
            return getCookie("SelectedComponent");
        };

        var setComponentCookie = function (componentId) {
            setCookie("SelectedComponent", componentId, 365);
        };
        //public API
        return {
            getAjaxData: getAjaxData,
            postAjaxData: postAjaxData,
            prepareSectionMenu: prepareSectionMenu,
            getDateFormat: getDateFormat,
            formatJSDateToCsharpDate: formatJSDateToCsharpDate,
            formatDatePickerToCsharpDate: formatDatePickerToCsharpDate,
            formatJSDateIntoMonthYear: formatJSDateIntoMonthYear,
            formatJSDateToDatePicker: formatJSDateToDatePicker,
            formatJsDatetoMMddYYYY: formatJsDatetoMMddYYYY,
            setCookie: setCookie,
            getCookie: getCookie,
            formatCsharpDateToDatePicker: formatCsharpDateToDatePicker,
            addValidation: addValidation,
            removeValidation: removeValidation,
            findString: findString,
            htmlEncode: htmlEncode,
            htmlDecode: htmlDecode,
            getProjectCookie: getProjectCookie,
            setProjectCookie: setProjectCookie,
            getComponentCookie: getComponentCookie,
            setComponentCookie: setComponentCookie
        };
    }();
}

//window.addEventListener('resize', function () {
//    "use strict";
//    window.location.reload();
//});
