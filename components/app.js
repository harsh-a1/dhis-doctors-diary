import React,{propTypes} from 'react';
import dhis2API from '../dhis2API'

export function UploadFile(props){

    function encodeFileAsURL(){}
    return (
            <div>
            <input type="file" id={props.id} onChange={encodeFileAsURL(this)}/>
            </div>
    )
}

export function ReportContainer(props){


    return (

            <NewReportForm />            

    )

}

function NewReportForm(props){
    var instance = Object.create(React.Component.prototype)
    instance.props = props;   


    function handleSubmit(event){
        event.preventDefault();
/*
        var XLSX = require('xlsx-populate');
        
        var fileService = require('../utility-fileOps');
        var test = event.target.elements.excelFile.files[0]

        var excelP = fileService.loadExcelFile(test);
        excelP.then(function(wb){
            
         //   XLSX.writeFile(wb.wb,'out.xls')
            
        })
        var ds = new dhis2API.dataStoreService("XLReports");
        ds.getValue(12784,function(error,response,body){
            
            var data = JSON.parse(body);
           
            XLSX.fromDataAsync(data.excelTemplate,{base64:true}).then(function(wb){
                debugger
                wb.outputAsync().then(function(blob){
                    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                        window.navigator.msSaveOrOpenBlob(blob, "out.xlsx");
                    } else {
                        var url = window.URL.createObjectURL(blob);
                        var a = document.createElement("a");
                        document.body.appendChild(a);
                        a.href = url;
                        a.download = "out.xlsx";
                        a.click();
                        window.URL.revokeObjectURL(url);
                        document.body.removeChild(a);
                }
                    debugger
                });
            });
                     
        })
  */      
       
        var data = {
            name : event.target.elements.name.value,
            description : event.target.elements.description.value,
            periodType : event.target.elements.periodType.selectedOptions[0].value,
            orgUnitLevel : event.target.elements.orgUnitLevel.value,
            excelTemplate :event.target.elements.excelFile.files[0],
            json : event.target.elements.jsonFile.files[0]
        }

        var fileService = require('../utility-fileOps');

        var excelP = fileService.loadExcelFile(data.excelTemplate);
        var jsonP = fileService.loadJsonFile(data.json)

        Promise.all([excelP,jsonP]).then(function(values){
            data.excelTemplate = values[0];
            data.json = values[1];
            var dsService = new dhis2API.dataStoreService("XLReports");
            
               dsService.saveOrUpdate(data,function(error,response,body){
                   
               });
            
            debugger
        })
    
        
    }
    
    
    
    instance.render = function(){
        return (
            
                <form onSubmit={handleSubmit}>
                <table>
                <tbody>
                <tr>
                <td>Name : </td><td><input id="name" type="text"></input></td>
                </tr>
                <tr>
                <td>Description : </td><td><input id="description" type="text"></input></td>
                </tr>
                <tr>
                <td>Period Type : </td><td><select id="periodType">
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option></select></td>
                </tr>
                <tr>
                <td>Org Unit Level : </td><td><input type="number" id="orgUnitLevel"></input></td>
                </tr>
                <tr>
                <td>Upload Excel Template </td><td><UploadFile id="excelFile"/></td>
                </tr>
                <tr>
                <td>Upload XML Mapping File : </td><td><UploadFile id="jsonFile" /></td>
                </tr>
                
            </tbody>
                </table>

                <input type="submit"  value="Add"></input>
                </form>
        )
    }

    return instance;
}

function AddNewButton(){


    function addRow(){

        var data = {
            name : "Report1",
            period : "Montlhy",
            ou : "sadfasf",
            excelTemplate : {},
            xml : {}
        }
        
        
        var dsService = new dhis2API.dataStoreService("XLReports");

        dsService.saveOrUpdate(data,function(error,response,body){
            
        });
        
        

    }
    
    return (
            <input type="button" onClick = {addRow} value="Add"></input>
    )

}
