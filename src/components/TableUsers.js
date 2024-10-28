import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../services/UserService'

const TableUsers = (props) => {
    const [listUsers, setListUsers] = useState([]);

    useEffect(()=>{
        getUsers();
    },[])

    const getUsers = async () => {
        let res = await fetchAllUser();

        if (res ){
            setListUsers(res) 
        }    
    }
    // console.log("Check res: ", listUsers)

    return(<>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Message</th>
          <th>Image</th>
        </tr>
      </thead>
      <tbody>
        {listUsers && listUsers.length > 0 &&

        listUsers.map((user, index) => {
            return(
                <tr key={index} >
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.message}</td>
                <td>{user.image}</td>
            </tr>
            )
            
        })

        }
      </tbody>
    </Table>
    </>)
}

export default TableUsers