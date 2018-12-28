'use strict';
import React from 'react';
import Modal from '../../components/common/modal';

const PersonalizeRow = ({
        preparedFor,
        preparedBy,
        nav,
        setPreparedFor,
        setPreparedBy,
        setResultTab,
        showPrintPage
    }) => {
    const startOver = () => {
        window.location.href = '#';
        window.location.reload();
    };

    const changeTab = (tab) => {
        setResultTab(tab);
    };

    const printPage = () => {
        showPrintPage(true).then(() => {
            setTimeout(() => {
                const accessKey = '99975fcb53ea57aadf2ebfa4206f0080';
                let html = document.getElementsByTagName('html')[0].outerHTML;
                html = html.split('</head>');
                html.splice(1, 0, '<link rel="stylesheet" href="https://forio.com/app/cbre/lease-calculator-test/css/pdf.css">');
                html.splice(2, 0, '</head>');
                html = html.join('');
                const xhr = new XMLHttpRequest();
                xhr.open('POST', 'https://api.pdflayer.com/api/convert?access_key=' + accessKey + '&page_size=Letter', true);
                xhr.responseType = 'blob';
                xhr.onload = function (e) {
                    if (this.status === 200) {
                        //response data of the onload object
                        const file = new Blob([this.response], {
                            type: 'application/pdf'
                        });
                        if (navigator.msSaveBlob) {
                            return navigator.msSaveBlob(file, 'report.pdf');
                        } else {
                            const fileURL = URL.createObjectURL(file);
                            const a = document.createElement('a');
                            a.href = fileURL;
                            a.download = 'report.pdf';
                            document.body.appendChild(a);
                            a.className = 'pdf-link';
                            a.click();
                            $(window).on('focus', function (e) {
                                $('.pdf-link').remove();
                            });
                        }
                    }
                };
                const formData = new FormData();
                formData.append('document_html', html);
                xhr.send(formData);
                showPrintPage(false);
            }, 2000);
        });
    };

    const changeInputValue = (fn, e) => {
        let value = e.target.value;
        fn(value);
    };

    return (
        <div className="col-xs-12 personalize-row">
            <div className="col-xs-12 col-md-5">
                <div className="prepared-div">
                    <span className="title">Prepared For:</span>
                    <input className="value" value={preparedFor} onChange = {changeInputValue.bind(null, setPreparedFor)} />
                </div>
                <div className="prepared-div">
                    <span className="title">Prepared By: </span>
                    <input className="value" value={preparedBy} onChange = { changeInputValue.bind(null, setPreparedBy)} />
                </div>
            </div>
            <div className="col-xs-12 col-md-4 toggle-row">
                <button className={nav.resultTab === 0 ? 'active btn-primary float-none' : 'btn-primary float-none'} onClick={changeTab.bind(null, 0)}>Graphical</button>
                <button className={nav.resultTab === 1 ? 'active btn-primary float-none' : 'btn-primary float-none'} onClick={changeTab.bind(null, 1)}>Detailed (Table)</button>
            </div>
            <div className="col-xs-12 col-md-3 print-row">
                <button className="btn-primary" data-toggle="modal" data-target="#modal">Start Over</button>
                <button className="btn-primary" onClick={printPage}>Print</button>
            </div>
            <Modal message={'Are you sure you want to restart the analysis as this will remove all data?'} onSubmit={startOver}/>
        </div>
    );
};
export default PersonalizeRow;