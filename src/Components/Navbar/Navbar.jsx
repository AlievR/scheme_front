import React, { useState } from 'react'
import './Navbar.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Navbar({ name, gateway, createdAt, uploadScheme }) {

    const [selectedFile, setselectedFile] = useState([])
    const [countFile, setcountFile] = useState(0)


    const onClickHandler = () => {
        for (let file of selectedFile) {
            uploadScheme(file)
        }
    }


    const dragOver = (e) => {
        e.preventDefault();
    }

    const dragEnter = (e) => {
        e.preventDefault();
    }

    const dragLeave = (e) => {
        e.preventDefault();
    }

    //сделать проверку на добавление уже имеющегося файла в драгон дроп

    /*
        const fileDrop = async (e) => {
            e.preventDefault();
            setbufferFile(Array.from(e.dataTransfer.files))
            let ask = await checkFileName()
            console.log("ask",ask)
            bufferFile.map(file => selectedFile.push(file))
            setselectedFile(selectedFile)
            setcountFile(selectedFile.length)
            if (selectedFile.length > 5) {
                setselectedFile([])
                setcountFile(0)
                toast.error("Можно прикрепить не более 5 файлов!")
            }
        }
    */

    const fileDrop = async (e) => {
        e.preventDefault();
        let Files = Array.from(e.dataTransfer.files)
        let search_double = await checkFileName(Files)
        if(search_double != null)
        {
            toast.error(`Файл ${search_double} уже добавлен!`)
        }
        else {
            Files.map(file => selectedFile.push(file))
        }
        setselectedFile(selectedFile)
        setcountFile(selectedFile.length)
        if (selectedFile.length > 5) {
            setselectedFile([])
            setcountFile(0)
            toast.error("Можно прикрепить не более 5 файлов!")
        }
    }


    const checkFileName = (Files) => {
        for (let file_buf of Files) {
            var search_file = selectedFile.find(file => file.name == file_buf.name)
        }
        if (search_file != null) {
            return search_file.name
        }
    }

    /*

    
    const checkFileName = (files) => {

        for (let file of files) {

            console.log('файл', file.name)
        }

    }
*/
    const onClickHandlerRemoveFile = async (id) => {
        let arr = await selectedFile.filter((system, index) => index != id)
        setselectedFile(arr)
        setcountFile(arr.length)
    }

    const fileSize = (size) => {
        if (size === 0) {
            return '0 Bytes';
        }
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(size) / Math.log(k));
        return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }


    return (
        <div className="navbar__header">
            <div className="navbar__conatiner">
                <div className="navbar__content">
                    <div className="navbar__info">
                        <div className="navbar__upload">
                            <div className="navbar__subtile" >
                                <span className="subtile__text"><b>Информационная система:</b> {name}</span>
                                <span className="subtile__text"><b>IP-адрес сети:</b> {gateway}</span>
                                <span className="subtile__text"><b>Дата создания системы: </b> {createdAt}</span>
                            </div>
                        </div>
                    </div>
                    <div
                        className="menu__btn"
                        onDragOver={dragOver}
                        onDragEnter={dragEnter}
                        onDragLeave={dragLeave}
                        onDrop={fileDrop}
                    >
                        {
                            countFile == 0
                                ?
                                <div className="drop__message">
                                    <div className="upload__icon" />
                                    Загрузите файлы в это окно
                                </div>
                                :
                                <div>

                                    <button
                                        className="upload__button"
                                        type="button"
                                        onClick={onClickHandler}
                                    >
                                        Загрузить {countFile} файла
                                         </button>
                                    {
                                        console.log(selectedFile),
                                        selectedFile.map((obj, id) => {
                                            return (
                                                <div key={id} className="file__status-bar">
                                                    <div className="file__atribut">
                                                        <div className="file__type-logo" />
                                                        <span className="file__name">{obj.name}</span>
                                                        <span className="file__size">({fileSize(obj.size)})</span>
                                                        <button
                                                            className="file__remove"
                                                            onClick={() => onClickHandlerRemoveFile(id)}>
                                                            <span className="file__krest">X</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Navbar
