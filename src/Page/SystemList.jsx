import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { BlockLoading, WindMillLoading } from 'react-loadingg';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHttp } from '../hooks/http.hook'


import TableSystem from '../Components/Table/TableSystem'
import Header_Table from '../Components/Table/Header_TableSystems'
import AddSystem from '../Components/AddSystem/AddSystem'
import Table_Pagination from '../Components/Table/Table_Pagination'
import Table_menu from '../Components/Table/Table_menu'



function SystemList() {

    const [items, setItems] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [sort, setSort] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(3)
    
    const url = "http://localhost:5000/api/systems"

    const { request, error, clearError } = useHttp()


    useEffect(() => {
        toast.error(error)

        clearError()
    }, [error, clearError])


    useEffect(async () => {
        try {
            const data = await request(url, 'GET')
            setIsLoaded(true);
            setItems(data);
        } catch (error) {
            setIsLoaded(true);
        }
    }, [isLoaded])


    const addSystem = async (request_type, formInfo) => {
        try {
            const data = await request(url, String(request_type), formInfo)
            toast.success(data.message)
            setIsLoaded(false)
        } catch (error) {
            toast.error(error)
        }
    }


    const removeScheme = async (_id, request_type) => {
        try {
            const data = await request(url, String(request_type), { _id })
            toast.success(data.message)
            setIsLoaded(false)
        } catch (error) {
            toast.error(error)
        }
    }

    const editScheme = async (_id, name) => {
        try {
            const data = await axios.put(`http://localhost:5000/api/systems/${_id}`, { name })
            toast.success(`Система ${name} переименована!`)
            setIsLoaded(false)
        }
        catch (e) {
            console.error(e);
        }

    }

    const SortByUp = async (param) => {
        if (param == "name") {
            setItems(await items.sort((a, b) => a.name < b.name ? 1 : -1))
        }
        if (param == "createdAt") {
            setItems(await items.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1))
        }
        setSort(false)
        setSort(true)
    }

    const SortByDown = async (param) => {
        if (param == "name") {
            setItems(await items.sort((a, b) => a.name > b.name ? 1 : -1))
        }
        if (param == "createdAt") {
            setItems(await items.sort((a, b) => a.createdAt > b.createdAt ? 1 : -1))
        }
        setSort(false)
        setSort(true)

    }

    // Get current posts
   // console.log("items", items)
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = items.slice(indexOfFirstPost, indexOfLastPost)
    //console.log('mas',currentPosts)
   // console.log('col',postsPerPage)
    //console.log('str',currentPage)

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


    // Выбор кол-ва выводимых строк в таблицк
    const newPostsPerPage = (entries) => {
        if (entries === "All") {
            entries = items.length
        }
        setPostsPerPage(entries)
    }

    // Фильтрация по таблице 
    const filterTable = async (search) => {
        setItems(items.filter((item) => item.name.toLowerCase().indexOf(search) > -1))
    }


    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <BlockLoading
            size='large' />
    } else {
        return (
            <div className="system_list">
                <Table_menu
                    postsPerPage={postsPerPage}
                    newPostsPerPage={newPostsPerPage}
                    filterTable={filterTable}
                />
                < table className="table__system">
                    <Header_Table
                        SortByUp={SortByUp}
                        SortByDown={SortByDown}
                    />
                    <tbody>
                        {
                            currentPosts.map((obj) => {
                                return (
                                    <TableSystem key={obj._id} {...obj}
                                        removeScheme={removeScheme}
                                        editScheme={editScheme} />
                                )
                            })
                        }
                    </ tbody>
                </ table>
                <Table_Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={items.length}
                    paginate={paginate}
                />
            </div>

        )
    }
}
export default SystemList


