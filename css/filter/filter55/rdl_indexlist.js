var sProductName = 'Rainer\'s Handbook';
var sTrademark = 'Rainer\'s Handbook';
var sHomeURL = 'mailto:dhtmlet@hotmail.com?subject=Hello , Rainer ...';
var sCopyrightCh = '苏昱作品·版权所有';
var sCopyrightEn = '&copy;2002 Rainer Su . All rights reserved .';
var sStyleURL = 'rdl_indexlist.css';
var sParentURL = 'rdl_index.html';
var sParentNote = '返回首页';
var sPrefix = '';
var sTitleText = '';

var collFriendLists;
var collHeadNotes;
var collListItems;
var collAllTRIEs = new Array();

var collTRIEs = new Array(
    new Array('All', '90'),
    new Array('Unsupported', '80'),
    new Array('IE6.0', '60'),
    new Array('IE5.5', '55'),
    new Array('IE5.0', '50'),
    new Array('IE4.0', '40')
);

var oListDiv;


function rdlMakeOption(sOption, sPrefix, oSelect) {

    var oOption = document.createElement("option");
    oSelect.options.add(oOption, 0);

    if (sOption == '0') {
        oOption.innerHTML = '------------------------------------------';
        oOption.style.color = '#99AACC';
        oOption.value = '0';
    } else {
        oOption.innerHTML = '      ' + sOption;
        oOption.value = sPrefix + (sOption.replace(/\W/g, '')).toLowerCase() + '.html';
    }

}


function rdlMakeOptions(collFriends, sPrefix, sFriendTitle, oSelect) {

    if (collFriends == null || collFriends.length == 0) return;
    //rdlMakeOption('No '+sFriendTitle+' or Init false...','',oSelect);else
    for (mLoop = 0; mLoop < collFriends.length; mLoop++) rdlMakeOption(collFriends[mLoop], sPrefix, oSelect);
    rdlMakeOption('0', '', oSelect);

}


function doSelect(e) {
    with(document.all('idSelect')) {
        var sValue = options[selectedIndex].value;
        options[0].selected = true;
    }
    if (sValue != '0') window.location = sValue;
}


function doSortIE(e) {

    with(document.all('idSortSelect')) {
        var sValue = options[selectedIndex].value;
    }

    //alert(sValue.replace(/\D/g,''));

    for (sLoop = 0; sLoop < collAllTRIEs.length; sLoop++) {
        if (collAllTRIEs[sLoop].id == 'idTRHead') {
            collAllTRIEs[sLoop].style.display = 'block';
            continue;
        }
        var iValue = parseInt(sValue);
        var iTRID = parseInt(collAllTRIEs[sLoop].id.replace(/\D/g, ''));
        if (iValue == 80) {
            if (iValue == iTRID) collAllTRIEs[sLoop].style.display = 'inline';
            else collAllTRIEs[sLoop].style.display = 'none';
            continue;
        }
        if (iValue >= iTRID) collAllTRIEs[sLoop].style.display = 'inline';
        else collAllTRIEs[sLoop].style.display = 'none';
    }

}

function rdlWindowLoad(e) {

    document.title = sProductName;
    var oHeadTable = document.createElement("table");
    oHeadTable.id = "idHeadTable";
    document.body.appendChild(oHeadTable);
    oHeadTable.cellPadding = oHeadTable.cellSpacing = 0;
    var oHeadTR = oHeadTable.insertRow();
    var oTrademarkTD = document.createElement("td");
    oTrademarkTD.id = "idTrademarkTD";
    oHeadTR.appendChild(oTrademarkTD);
    var oTrademarkA = document.createElement("a");
    oTrademarkTD.appendChild(oTrademarkA);
    with(oTrademarkA) {
        innerHTML = sTrademark;
        href = sHomeURL;
        target = '_blank';
    }
    var oSelectTD = document.createElement("td");
    oSelectTD.id = "idSelectTD";
    oHeadTR.appendChild(oSelectTD);
    var oParentA = document.createElement("a");
    oSelectTD.appendChild(oParentA);
    with(oParentA) {
        innerHTML = sParentNote;
        href = sParentURL;
        insertAdjacentHTML('afterEnd', ' | 相关内容: ');
    }
    var oFriendSelect = document.createElement("select");
    oFriendSelect.id = "idSelect";
    oSelectTD.appendChild(oFriendSelect);
    rdlMakeOptions(collFriendLists, 'rdl_', 'Lists', oFriendSelect);

    var oOption = document.createElement("option");
    oFriendSelect.options.add(oOption, 0);
    with(oOption) {
        innerHTML = 'See Also...';
        value = '0';
        selected = true;
    }

    var oContent = document.createElement("div");
    oContent.id = "idContent";
    document.body.appendChild(oContent);

    var oContentTitle = document.createElement("div");
    oContentTitle.id = "idContentTitle";
    oContent.appendChild(oContentTitle);
    oContentTitle.style.marginBottom = '20px';
    var oTitleName = document.createElement("span");
    oTitleName.id = "idTitleName";
    oContentTitle.appendChild(oTitleName);
    oTitleName.innerHTML = sTitleText;

    var oListModeA = document.createElement("a");
    oContentTitle.appendChild(oListModeA);
    with(oListModeA) {
        className = 'cssListModeA';
        href = window.location.href.replace('.html', '_com.html');
        innerHTML = '模式切换';
    }
    var oSortSelect = document.createElement("select");
    oSortSelect.id = "idSortSelect";
    oContentTitle.appendChild(oSortSelect);
    oSortSelect.insertAdjacentHTML('beforeBegin', ' | 过滤条件: ');

    for (eLoop = 0; eLoop < collTRIEs.length; eLoop++) {
        var oOption = document.createElement("option");
        oSortSelect.options.add(oOption, 0);
        with(oOption) {
            innerHTML = collTRIEs[eLoop][0];
            value = collTRIEs[eLoop][1];
        }
    }

    oListDiv = document.createElement("div");
    oListDiv.id = "idListDiv";
    oContent.appendChild(oListDiv);

    for (tLoop = 0; tLoop < collListItems.length; tLoop++) {
        var collItem = collListItems[tLoop];

        if (collItem[0] == 'Head') {
            var oListP = document.createElement("div");
            oListP.id = "idTRHead";
            //var oListP = document.createElement("div");
            //oListP.id = "idTR" + collItem[0];

            oListDiv.appendChild(oListP);
            with(oListP) {
                innerHTML = collItem[1];
                style.padding = '20px 0px 8px 0px';
                style.fontWeight = 'bold';
            }
            collAllTRIEs[tLoop] = oListP; /* 在JScript5.5+中可以使用collAllTRIEs.push(oListTR); */
        } else {
            var oListA = document.createElement("a");
            oListA.id = "idTR" + collItem[0];

            oListDiv.appendChild(oListA);
            with(oListA) {
                className = 'cssIEA';
                innerHTML = collItem[1];
                href = (sPrefix + collItem[1].replace(/\W/g, '')).toLowerCase() + '.html';
                title = '';
            }
            for (pLoop = 2; pLoop < collItem.length; pLoop++) {
                oListA.title = oListA.title + '\n\r' + collHeadNotes[pLoop - 1] + ': ' + collItem[pLoop] + '\n\r';
            }
            collAllTRIEs[tLoop] = oListA; /* 在JScript5.5+中可以使用collAllTRIEs.push(oListTR); */
        }

    }

    var oFootnote = document.createElement("div");
    oFootnote.id = "idFootnote";
    oContent.appendChild(oFootnote);
    var oCopyright = document.createElement("div");
    oCopyright.id = "idCopyright";
    oContent.appendChild(oCopyright);
    oCopyright.innerHTML = sCopyrightEn;
    oCopyright.insertAdjacentHTML('beforeBegin', sCopyrightCh);

    oFriendSelect.onchange = doSelect;
    oSortSelect.onchange = doSortIE;

}


window.onload = rdlWindowLoad;


/* Part of RDL(TM) - Written by Rain1977 */
/* HomeSite: http://www.dhtmlet.com  E-Mail: dhtmlet@hotmail.com */