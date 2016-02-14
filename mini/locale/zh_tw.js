/**
* jQuery MiniUI v3.0
* 
* Web Site : http://www.miniui.com
*
* Commercial License : http://www.miniui.com/license
*
* Copyright(c) 2012 All Rights Reserved. Shanghai PusSoft Co., Ltd (上海普加軟體有限公司) [ services@plusoft.com.cn ]. 
* 
*/


mini.locale = "zh_CN";


/* Date
-----------------------------------------------------------------------------*/

mini.dateInfo = {
    monthsLong: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    monthsShort: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
    daysLong: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
    daysShort: ["日", "一", "二", "三", "四", "五", "六"],
    quarterLong: ['一季度', '二季度', '三季度', '四季度'],
    quarterShort: ['Q1', 'Q2', 'Q2', 'Q4'],
    halfYearLong: ['上半年', '下半年'],
    patterns: {
        "d": "yyyy-M-d",
        "D": "yyyy年M月d日",
        "f": "yyyy年M月d日 H:mm",
        "F": "yyyy年M月d日 H:mm:ss",
        "g": "yyyy-M-d H:mm",
        "G": "yyyy-M-d H:mm:ss",
        "m": "MMMd日",
        "o": "yyyy-MM-ddTHH:mm:ss.fff",
        "s": "yyyy-MM-ddTHH:mm:ss",
        "t": "H:mm",
        "T": "H:mm:ss",
        "U": "yyyy年M月d日 HH:mm:ss",
        "y": "yyyy年MM月"
    },
    tt: {
        "AM": "上午",
        "PM": "下午"
    },
    ten: {
        "Early": "上旬",
        "Mid": "中旬",
        "Late": "下旬"
    },
    today: '今天',
    clockType: 24
};

/* Number
-----------------------------------------------------------------------------*/
mini.cultures["zh-CN"] = {
    name: "zh-CN",
    numberFormat: {
        number: {
            pattern: ["n", "-n"],
            decimals: 2,
            decimalsSeparator: ".",
            groupSeparator: ",",
            groupSize: [3]
        },
        percent: {
            pattern: ["n%", "-n%"],
            decimals: 2,
            decimalsSeparator: ".",
            groupSeparator: ",",
            groupSize: [3],
            symbol: "%"
        },
        currency: {
            pattern: ["$n", "$-n"],
            decimals: 2,
            decimalsSeparator: ".",
            groupSeparator: ",",
            groupSize: [3],
            symbol: "¥"
        }
    }
}
mini.culture("zh-CN");

/* MessageBox
-----------------------------------------------------------------------------*/
if(mini.MessageBox){
    mini.copyTo(mini.MessageBox, {
        alertTitle: "提醒",
        confirmTitle: "確認",
        prompTitle: "輸入",
        prompMessage: "請輸入內容：",
        buttonText: {
            ok: "確定", //"OK",
            cancel: "取消", //"Cancel",
            yes: "是", //"Yes",
            no: "否"//"No"
        }
    });
};

/* Calendar
-----------------------------------------------------------------------------*/
if (mini.Calendar) {
    mini.copyTo(mini.Calendar.prototype, {
        firstDayOfWeek: 0,
        yesterdayText: "昨天",
        todayText: "今天",
        clearText: "清除",
        okText: "確定",
        cancelText: "取消",
        daysShort: ["日", "一", "二", "三", "四", "五", "六"],
        format: "yyyy年MM月",

        timeFormat: 'H:mm'
    });
}


/* required | loadingMsg
-----------------------------------------------------------------------------*/
for (var id in mini) {
    var clazz = mini[id];
    if (clazz && clazz.prototype && clazz.prototype.isControl) {
        clazz.prototype.requiredErrorText = "不能為空";
        clazz.prototype.loadingMsg = "載入中...";
    }

}
/* VTypes
-----------------------------------------------------------------------------*/
if (mini.VTypes) {
    mini.copyTo(mini.VTypes, {
        minDateErrorText: '不能小於日期 {0}',
        maxDateErrorText: '不能大於日期 {0}',

        uniqueErrorText: "欄位不能重複",
        requiredErrorText: "不能為空",
        emailErrorText: "請輸入郵件格式",
        urlErrorText: "請輸入URL格式",
        floatErrorText: "請輸入數字",
        intErrorText: "請輸入整數",
        dateErrorText: "請輸入日期格式 {0}",
        maxLengthErrorText: "不能超過 {0} 個字元",
        minLengthErrorText: "不能少於 {0} 個字元",
        maxErrorText: "數字不能大於 {0} ",
        minErrorText: "數字不能小於 {0} ",
        rangeLengthErrorText: "字元長度必須在 {0} 到 {1} 之間",
        rangeCharErrorText: "字元數必須在 {0} 到 {1} 之間",
        rangeErrorText: "數字必須在 {0} 到 {1} 之間"
    });
}

/* Pager
-----------------------------------------------------------------------------*/
if (mini.Pager) {
    mini.copyTo(mini.Pager.prototype, {
        firstText: "首頁",
        prevText: "上一頁",
        nextText: "下一頁",
        lastText: "尾頁",
        pageInfoText: "每頁 {0} 條, 共 {1} 條"
    });
}

/* DataGrid
-----------------------------------------------------------------------------*/
if (mini.DataGrid) {
    mini.copyTo(mini.DataGrid.prototype, {
        emptyText: "沒有返回的數據"
    });
}

if (mini.FileUpload) {
    mini.FileUpload.prototype.buttonText = "瀏覽..."
}
if (mini.HtmlFile) {
    mini.HtmlFile.prototype.buttonText = "瀏覽..."
}

/* Gantt
-----------------------------------------------------------------------------*/
if (window.mini.Gantt) {
    mini.GanttView.ShortWeeks = [
        '日', '一', '二', '三', '四', '五', '六'
    ];
    mini.GanttView.LongWeeks = [
        '星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'
    ];

    mini.Gantt.PredecessorLinkType = [
        { ID: 0, Name: '完成-完成(FF)', Short: 'FF' },
        { ID: 1, Name: '完成-開始(FS)', Short: 'FS' },
        { ID: 2, Name: '開始-完成(SF)', Short: 'SF' },
        { ID: 3, Name: '開始-開始(SS)', Short: 'SS' }
    ];

    mini.Gantt.ConstraintType = [
        { ID: 0, Name: '越早越好' },
        { ID: 1, Name: '越晚越好' },
        { ID: 2, Name: '必須開始於' },
        { ID: 3, Name: '必須完成於' },
        { ID: 4, Name: '不得早於...開始' },
        { ID: 5, Name: '不得晚於...開始' },
        { ID: 6, Name: '不得早於...完成' },
        { ID: 7, Name: '不得晚於...完成' }
    ];

    mini.copyTo(mini.Gantt, {
        ID_Text: "標識號",
        Name_Text: "任務名稱",
        PercentComplete_Text: "進度",
        Duration_Text: "工期",
        Start_Text: "開始日期",
        Finish_Text: "完成日期",
        Critical_Text: "關鍵任務",

        PredecessorLink_Text: "前置任務",
        Work_Text: "工時",
        Priority_Text: "重要級別",
        Weight_Text: "權重",
        OutlineNumber_Text: "大綱欄位",
        OutlineLevel_Text: "任務層級",
        ActualStart_Text: "實際開始日期",
        ActualFinish_Text: "實際完成日期",
        WBS_Text: "WBS",
        ConstraintType_Text: "限制類型",
        ConstraintDate_Text: "限制日期",
        Department_Text: "部門",
        Principal_Text: "負責人",
        Assignments_Text: "資源名稱",

        Summary_Text: "摘要任務",
        Task_Text: "任務",
        Baseline_Text: "比較基準",
        LinkType_Text: "鏈接類型",
        LinkLag_Text: "延隔時間",
        From_Text: "從",
        To_Text: "到",

        Goto_Text: "轉到任務",
        UpGrade_Text: "升級",
        DownGrade_Text: "降級",
        Add_Text: "新增",
        Edit_Text: "編輯",
        Remove_Text: "刪除",
        Move_Text: "移動",
        ZoomIn_Text: "放大",
        ZoomOut_Text: "縮小",
        Deselect_Text: "取消選擇",
        Split_Text: "拆分任務"


    });

}