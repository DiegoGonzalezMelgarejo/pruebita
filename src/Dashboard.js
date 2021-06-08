import axios from 'axios';
import React from 'react';
import { getUser, removeUserSession } from './Utils/Common';
import  'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from 'react';
import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import swal from 'sweetalert';

import MaterialTable from 'material-table';
function Dashboard(props) {
  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };
  const user = getUser();

  const [datos, setData]= useState([]);
  // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    props.history.push('/login');
    window.location.reload(true);
  }

  useEffect(()=>{
    peticionesget();
  }, [])
  axios.defaults.headers.common['Authorization']='Bearer '+ localStorage.getItem('token')

  const peticionesget=async()=>{
    await axios.get('http://localhost:8000/api/vehiculos').then(res=>{
console.log(res)
setData(res.data);
  })}
  console.log("data")
  console.log(datos)
  const columnas=[
    {
      title:"id",
      field:'id'
     
    },
    {
      title:"Placa",
      field:'placa'
     
    },{
      title:"Kilometraje",
      field:'kilometraje'
     
    },
    {
      title:"Fecha",
      field:'fecha',
      type:"date",
      dateSetting: { locale: "es-CO" }
  
    
    
      
    }
    
  ]

  
  const paginacionopciones={
    rowsPerPageText:"Filas por Página",
    rangeSeparatorText:'de',
    selectAllRowsItem:true,
    selectAllRowsItemText:'Todos'

  }
  
  return (
    
    <div>
      Bienvenido al Sistema de control vehicular ({user.name}) !<br /><br />

      <input type="button" className="btn btn-danger" onClick={handleLogout} value="Logout" />
     
   <MaterialTable
   localization={  "es-CO" }
   columns={columnas}
   data={datos}
   icons={tableIcons}
   actions={
     [
       {
         icon:() => <Edit />,
   
        
         tooltip:'Editar Registro',
         onClick:(event,rowData)=>{
          props.history.push({
            pathname: '/editar/'+rowData.id,
            state: { id: rowData.id }
          })
         }
       },
       {
        icon:() => <DeleteOutline />,
 
       
        tooltip:'Borrar Registro',
        onClick:(event,rowData)=>{
          swal("¿Deseas eliminar este registro?", {
            buttons: {
              cancel: "Cancelar",
              catch: {
                text: "eliminar",
                value: true,
              },
          
            },
          })
          .then((value) => {
        
           if(value){
           
             axios.delete('http://localhost:8000/api/vehiculos/'+rowData.id).then(res=>{
               
             
        swal("Registro eliminado", {
          buttons: {
            cancel: "Ok",
           
        
          },
        })
        .then((value) => {
      
        
      window.location.reload(true);

           }).catch(error=>{
            


           })

             }).catch(error=>{
               console.log(error)
              swal("Error al eliminar registro");
        window.location.reload(true);


             })
           }
            
                
            
          });
        }
      }
     ]
   } title="Registro de vehiculos"
   options={{
     actionsColumnIndex:-1
   },{
    exportButton: true
  }}
   ></MaterialTable>
    </div>
  );
}

export default Dashboard;
