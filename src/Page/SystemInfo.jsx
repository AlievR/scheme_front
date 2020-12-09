import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { BlockLoading, WindMillLoading } from 'react-loadingg';
import { useParams } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Header_Table from '../Components/Table/Header_TableScheme'
import TableSheme from '../Components/Table/TableSheme'
import Navbar from '../Components/Navbar/Navbar'
import Table_Pagination from '../Components/Table/Table_Pagination'

function SystemInfo(props) {

    const [items, setItems] = useState([]);
    const [info_system, setInfo_system] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [sort,setSort] = useState(false)



    const { request, error, clearError } = useHttp()

    const { id } = useParams()
    const url = `http://localhost:5000/api/uploads/${id}`
    const url_id = `http://localhost:5000/api/systems/${id}`

    /*
    useEffect(() => {
        toast.error(error)
        clearError()
    }, [error, clearError])
*/

    //Получение информации по системе
    useEffect(async () => {
        try {
            const system_data = await request(url_id, 'GET')
            setInfo_system(system_data)
        } catch (error) {
        }
    }, [isLoaded])



    //Получение списка всех файлов для конрктной системы
    useEffect(async () => {
        try {
            console.log(url)
            const data = await request(url, 'GET')
            setIsLoaded(true);
            setItems(data);
        } catch (error) {
            setIsLoaded(true);
        }
    }, [isLoaded])


    // Загрузка файла
    const uploadScheme = async (selectedFile) => {
        try {
            const data = new FormData()
            data.append('file', selectedFile, selectedFile.name)
            const response = await axios.post(url, data)
            toast.success(`Файл ${selectedFile.name} добавлен!`)
            setIsLoaded(false)
        }
        catch (error) {
            toast.error(error.response.data.message)
        }

    }

    const dowlandScheme = (_id, name) => {
        axios({
            url: `http://127.0.0.1:5000/api/uploads/schema/${_id}`,
            method: 'GET',
            responseType: 'blob',
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', name);
            document.body.appendChild(link);
            link.click();
        });
        setIsLoaded(false)
    }

    const removeScheme = async (_id, fileSrc, name) => {
        try {
            const data = await axios.delete(`http://127.0.0.1:5000/api/uploads/schema/${_id}`, {
                data: {
                    fileSrc
                }
            })
            toast.success(`Файл ${name} удален!`)
            setIsLoaded(false)
        }
        catch (e) {
            console.error(e);
        }

    }

    const editScheme = async (_id, name) => {
        try {
            const data = await axios.put(`http://127.0.0.1:5000/api/uploads/schema/${_id}`, { name })
            toast.success(`Файл ${name} переименован!`)
            setIsLoaded(false)

        }
        catch (e) {
            console.error(e);
        }

    }

    //Блок сортировки данных
    const SortByUp = async (param) => {
        if (param == "name") {
            setItems(await items.sort((a, b) => a.name < b.name ? 1 : -1))
        }
        if (param == "owner") {
           //сделать для владельца
        }
        if (param == "updatedAt") {
            setItems(await items.sort((a, b) => a.updatedAt < b.updatedAt ? 1 : -1))
        }
        setSort(false)
        setSort(true)
    }

    const SortByDown = async (param) => {
        console.log(items)
        console.log(param)
        if (param == "name") {
            setItems(await items.sort((a, b) => a.name > b.name ? 1 : -1))
        }
        if (param == "owner") {
           //сделать для владельца
        }
        if (param == "updatedAt") {
            setItems(await items.sort((a, b) => a.updatedAt > b.updatedAt ? 1 : -1))
        }
        setSort(false)
        setSort(true)
    }




    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <BlockLoading
            size='large' />
    } else {
        return (
            <div>

                <Navbar {...info_system}
                    uploadScheme={uploadScheme}
                />

                < table className="table__system">
                    <Header_Table
                        SortByUp={SortByUp}
                        SortByDown={SortByDown}
                    />
                    <tbody>
                        {
                            items.map((obj) => {
                                return (
                                    <TableSheme key={obj._id} {...obj}
                                        dowlandScheme={dowlandScheme}
                                        removeScheme={removeScheme}
                                        editScheme={editScheme}
                                    />
                                )
                            })
                        }
                    </ tbody>
                </ table>
            </div>
        )
    }
}

export default SystemInfo
