import React, { SyntheticEvent, useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { randomFillSync } from "crypto";
import { Link, Navigate } from "react-router-dom";
import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { styled, useTheme, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import ManagerBar from "./ManagerBar";

interface IClient{
    clientId: number,
    clientRole: string,
    email: string
}

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

export default function Manager(){
    const [name, setName] = useState('');
    const [role, setRole] = useState('');

    const [admin, setAdmin] = useState(false); 
        const [adminRole, setAdminRole] = useState('');
        const [adminEmail, setAdminEmail] = useState('');
        const [adminPassword, setAdminPassword] = useState('');
    const [user, setUser] = useState(false); 
        const [userRole, setUserRole] = useState('');
        const [userEmail, setUserEmail] = useState('');
        const [userPassword, setUserPassword] = useState('');

    const [allAdmins, setAdminsDisplay] = useState<IClient[]>([]);
    const [allUsers, setUsersDisplay] = useState<IClient[]>([]);
    const [allAdminsSearch, setAdminsDisplaySearch] = useState<IClient[]>([]);
    const [allUsersSearch, setUsersDisplaySearch] = useState<IClient[]>([]);

    const[redirect, setRedirect] = useState(false);

    const [showAdmin, setShowAdmin] = useState(false);
    const [showUser, setShowUser] = useState(false);

    const [adminSearch, setAdminsSearch] = useState('');
    const [adminSearchb, setAdminsSearchb] = useState(false);
    const [usersSearch, setUsersSearch] = useState('');
    const [usersSearchb, setUsersSearchb] = useState(false);

    const [currentPage, setCurrent] = useState(1);
    const [itemsPerPage] = useState(5);

    useEffect(() => {
  
        function getAdmins(){
            fetch('http://localhost:7229/api/role', {
                method: 'POST',
                headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({role: "Admin"})
                }).then(res => res.json())
                .then(res => {
                //console.log(res);
                setAdminsDisplay(res);
                });
        }
        getAdmins();
        
        function getUsers(){
            fetch('http://localhost:7229/api/role', {
                method: 'POST',
                headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({role: "User"})
                }).then(res => res.json())
                .then(res => {
                //console.log(res);
                setUsersDisplay(res);
                });
        }
        getUsers();
        },[]);

        useEffect(() => {
            (
                async () => {
                    const response = await fetch('http://localhost:7229/api/client', {
                        method: 'GET',
                        headers: {'Content-Type': 'application/json'},
                        credentials: 'include',
                    });
          
                    const content = await response.json();
          
                    setRole(content.clientRole);
                }
            )();
          });

        function searchAdmin(){
            fetch('http://localhost:7229/api/email', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({role: adminSearch})
        }).then(res => res.json())
        .then(res => {
            setAdminsDisplaySearch(res);
        });
        setAdminsSearchb(true);
}
        function searchUser(){
            fetch('http://localhost:7229/api/email', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({role: usersSearch})
        }).then(res => res.json())
        .then(res => {
            setUsersDisplaySearch(res);
        });
        setUsersSearchb(true);
    }

    const submitAdmin = () =>{
        async function registerAdmin(){
            try {
                const response = await fetch('http://localhost:7229/register/admin', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                  },
                  body: JSON.stringify({
                    email: adminEmail,
                    password: adminPassword })
                });
            
                if (!response.ok) {
                  throw new Error(`Error! status: ${response.status}`);
                }
            
                const result = (await response.json()) as IClient;
            
                console.log('result is: ', JSON.stringify(result, null, 4));
              } catch (error) {
                if (error instanceof Error) {
                  console.log('error message: ', error.message);
                  return error.message;
                } else {
                  console.log('unexpected error: ', error);
                  return 'An unexpected error occurred';
                }
              }
        }
        registerAdmin();
    }

    const submitUser = () =>{
        async function registerUser(){
            try {
                const response = await fetch('http://localhost:7229/register/user', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                  },
                  body: JSON.stringify({
                    email: userEmail,
                    password: userPassword })
                });
            
                if (!response.ok) {
                  throw new Error(`Error! status: ${response.status}`);
                }
            
                // const result = (await response.json()) as IClient;
            
                // console.log('result is: ', JSON.stringify(result, null, 4));
              } catch (error) {
                if (error instanceof Error) {
                  console.log('error message: ', error.message);
                  return error.message;
                } else {
                  console.log('unexpected error: ', error);
                  return 'An unexpected error occurred';
                }
              }
        }
        registerUser();
    }

    const deleteClient = (id : number) =>{
        const responce = fetch ('http://localhost:7229/api/' + id, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
            });
            setRedirect(true);
            window.location.reload();
    }

    const somethingA=(e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>)=> {
        if (e.key === "Enter") {
            searchAdmin();
        }
    } 

    const somethingU=(e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>)=> {
        if (e.key === "Enter") {
            searchUser();
        }
    }
    
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentAdmin = allAdmins.slice(indexOfFirstItem, indexOfLastItem);
    const currentAdminSearch = allAdminsSearch.slice(indexOfFirstItem, indexOfLastItem);

    const currentUser = allUsers.slice(indexOfFirstItem, indexOfLastItem);
    const currentUserSearch = allUsersSearch.slice(indexOfFirstItem, indexOfLastItem);

    const handleClose = () => setShowAdmin(false);
    const handleShow = () => setShowAdmin(true);
    const handleCloseu = () => setShowUser(false);
    const handleShowu = () => setShowUser(true);

    const paginate = (pageNumber : number) => setCurrent(pageNumber);

    function pag (pageNumber : number){
        setCurrent(pageNumber);
    }

    function Pagination (postPerPage : number, totalPost : number){
        const pageNumbers = [];
      
      
        for(let i = 1; i <= Math.ceil(totalPost / postPerPage); i++){
            pageNumbers.push(i);
        }
      
        return(
            <nav>
                <ul className="pagination">
                    {pageNumbers.map(number => (
                        <li key={number} className="page-item">
                            <a onClick={() => pag(number)} className="page-link">{number}</a>
                        </li>
                    ))}
                </ul>
            </nav>
        );
      }

      let menu;
      let menuAll;
      
      let searchmenuAdmin;
      let searchmenuUser;

      if(adminSearchb == true){
        searchmenuAdmin = (
          <>
          {currentAdminSearch.map((el) => (
      
      <tr>
          <td>{el.clientRole}</td>
          <td>{el.email}</td>
          <td>
              <div className="btn-all">
                  <div className="btn-delete">
                      <MDBBtn className="btn-delete" color='danger' tag='a' floating onClick={() => deleteClient(el.clientId)}>
                          <MDBIcon fas icon="trash" />
                      </MDBBtn>
                  </div>
              </div>
          </td>
      </tr>
              ))}
              {Pagination(itemsPerPage, allAdminsSearch.length)}
          </>
        )
      }
      if(adminSearchb == false){
        searchmenuAdmin = (
          <>
          {currentAdmin.map((el) => (
      
      <tr>
          <td>{el.clientRole}</td>
          <td>{el.email}</td>
          <td>
              <div className="btn-all">
                  <div className="btn-delete">
                      <MDBBtn className="btn-delete" color='danger' tag='a' floating onClick={() => deleteClient(el.clientId)}>
                          <MDBIcon fas icon="trash" />
                      </MDBBtn>
                  </div>
              </div>
          </td>
      </tr>
              ))}
              {Pagination(itemsPerPage, allAdmins.length)}
          </>
        );
      }

      if(usersSearchb == true){
        searchmenuUser = (
          <>
          {currentUserSearch.map((el) => (
      
      <tr>
          <td>{el.clientRole}</td>
          <td>{el.email}</td>
          <td>
              <div className="btn-all">
                  <div className="btn-delete">
                      <MDBBtn className="btn-delete" color='danger' tag='a' floating onClick={() => deleteClient(el.clientId)}>
                          <MDBIcon fas icon="trash" />
                      </MDBBtn>
                  </div>
              </div>
          </td>
      </tr>
              ))}
              {Pagination(itemsPerPage, allUsersSearch.length)}
          </>
        )
      }
      if(usersSearchb == false){
        searchmenuUser = (
          <>
          {currentUser.map((el) => (
      
      <tr>
          <td>{el.clientRole}</td>
          <td>{el.email}</td>
          <td>
              <div className="btn-all">
                  <div className="btn-delete">
                      <MDBBtn className="btn-delete" color='danger' tag='a' floating onClick={() => deleteClient(el.clientId)}>
                          <MDBIcon fas icon="trash" />
                      </MDBBtn>
                  </div>
              </div>
          </td>
      </tr>
              ))}
              {Pagination(itemsPerPage, allUsers.length)}
          </>
        );
      }

      if(admin == true){
        menu = (
            <div>
              <Search className="search-all">
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={e => setAdminsSearch(e.target.value)}
                  onKeyDown={(e) => somethingA(e) }
                />
              </Search>
    
                <div className="btn-add">
                    <MDBBtn color='dark' tag='a' floating onClick={handleShow}>
                        <MDBIcon fas icon="plus" />
                    </MDBBtn>            
                </div>
                <Modal show={showAdmin} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add new admin</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form onSubmit={submitAdmin}>
                        <div className="form-add">
                            <h6 className="mb-3 fw-normal">Email</h6>
                            <input type="text" className="form-control" placeholder="Email" required 
                            onChange={e => setAdminEmail(e.target.value)}/>
                        </div>
                        <div className="form-add">
                            <h6 className="mb-3 fw-normal">Password</h6>
                            <input type="text" className="form-control" placeholder="Password" required 
                            onChange={e => setAdminPassword(e.target.value)}/>
                        </div>
                        <Button className="btn-custom" variant="dark" type="submit">Add Client</Button>
                        
            </form>
            </Modal.Body>
          </Modal>
                <Table striped>
          <thead>
            <tr>
              <th>Client Role</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {searchmenuAdmin}
          </tbody>
        </Table>
            </div>
            
        );
    }
    if(user == true){
        menu = (
            <div>
              <Search className="search-all">
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={e => setUsersSearch(e.target.value)}
                  onKeyDown={(e) => somethingU(e) }
                />
              </Search>
    
                <div className="btn-add">
                    <MDBBtn color='dark' tag='a' floating onClick={handleShowu}>
                        <MDBIcon fas icon="plus" />
                    </MDBBtn>            
                </div>
                <Modal className="down" show={showUser} onHide={handleCloseu}>
            <Modal.Header closeButton>
              <Modal.Title>Add new user</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form onSubmit={submitUser}>
                        <div className="form-add">
                            <h6 className="mb-3 fw-normal">Email</h6>
                            <input type="text" className="form-control" placeholder="Email" required 
                            onChange={e => setUserEmail(e.target.value)}/>
                        </div>
                        <div className="form-add">
                            <h6 className="mb-3 fw-normal">Password</h6>
                            <input type="text" className="form-control" placeholder="Password" required 
                            onChange={e => setUserPassword(e.target.value)}/>
                        </div>
                        <Button className="btn-custom" variant="dark" type="submit">Add Client</Button>
                        
            </form>
            </Modal.Body>
          </Modal>
                <Table striped>
          <thead>
            <tr>
              <th>Client Role</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {searchmenuUser}
          </tbody>
        </Table>
            </div>
            
        );
    }
    if(admin == true){
      menu = (
        <div>
              <Search className="search-all">
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={e => setAdminsSearch(e.target.value)}
                  onKeyDown={(e) => somethingA(e) }
                />
              </Search>
    
                <div className="btn-add">
                    <MDBBtn color='dark' tag='a' floating onClick={handleShow}>
                        <MDBIcon fas icon="plus" />
                    </MDBBtn>            
                </div>
                <Modal className="down" show={showAdmin} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add new admin</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form onSubmit={submitAdmin}>
                        <div className="form-add">
                            <h6 className="mb-3 fw-normal">Email</h6>
                            <input type="text" className="form-control" placeholder="Email" required 
                            onChange={e => setAdminEmail(e.target.value)}/>
                        </div>
                        <div className="form-add">
                            <h6 className="mb-3 fw-normal">Password</h6>
                            <input type="text" className="form-control" placeholder="Password" required 
                            onChange={e => setAdminPassword(e.target.value)}/>
                        </div>
                        <Button className="btn-custom" variant="dark" type="submit">Add Admin</Button>
                        
            </form>
            </Modal.Body>
          </Modal>
                <Table striped>
          <thead>
            <tr>
              <th>Client Role</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {searchmenuAdmin}
          </tbody>
        </Table>
            </div>
      )
    }
    if(admin == false && user == false){
        menu = (
          <div className="text-admin">
            Welcome to the manager's page!
          </div>
        )
      }
      if(role != "Manager"){
        menuAll = (
          <div>
            <h2>Nothing to see here!</h2>
            <p>
              <Link to="/">Go to the home page</Link>
            </p>
          </div>
        )
      }
      else
{
  menuAll = (
    <div>
            {/* <AdminHeader name={name} setName={setName}></AdminHeader> */}
            <div className="main">
                <div className="bar-part">
                    <ManagerBar menu={menu} name={name} setName={setName} setAdmin={setAdmin} setUser={setUser}></ManagerBar>
                </div>
                {/* <div className="main-part">{menu}</div> */}
            </div>
        </div>
  )
}

    return(
        <div>
          {menuAll}
        
        </div>
    );
}