import {IoAdd} from "react-icons/io5";
import React, {useEffect, useState} from "react";
import {Modal} from "react-bootstrap";
import {defaultQuizId, questionInitialState} from "../../questionType";
import {addQuestionToQuiz} from "../../client";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {addQuestion} from "./reducer";

export default function AddQuestionController() {
    // 用来打开弹窗create new question
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const [question, setQuestion] = useState(questionInitialState);
    const {qid} = useParams();

    const dispatch = useDispatch();
    const handleAddNewQuestion = async () => {
        try{
            const formattedQuestion = {
                ...question,
                quizId: qid, // 正确的quizId
            };
            if(qid){
                const response = await addQuestionToQuiz(qid, formattedQuestion);
                dispatch(addQuestion(response));
            }
        }catch (error){
            console.error("Error creating question:", error);
            alert("Error saving quiz. Please check console logs for more details.");
        }
        console.log('Question Saved:', question);
        closeModal();
    };

    useEffect(() => {
        if (isModalOpen) {
            setQuestion(questionInitialState);
        }
    }, [isModalOpen]);


    return(
        <div id="wd-question-button" className="p-3">


            <Modal
                show={isModalOpen}
                onHide={closeModal}
                contentLabel="Add New Question"
                className=" modal-dialog-centered"
                overlayClassName="modal-backdrop"
            >
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add New Question</h5>
                        <button className="btn-close" onClick={closeModal}></button>
                    </div>
                    <div className="modal-body">

                        {/*添加名字*/}
                        <div className="mb-3">
                            <label htmlFor="question-type" className="form-label">
                                Question Name
                            </label>
                            <input
                                id="question-name"
                                type="text"
                                className="form-control"
                                value={question.title}
                                onChange={(e) => setQuestion({...question, title: e.target.value})}
                                placeholder="Enter question name"
                            />
                        </div>

                        {/*添加问题类型*/}
                        <div className="mb-3">
                            <label htmlFor="question-type" className="form-label">
                                Question Type
                            </label>
                            <select
                                id="question-type"
                                className="form-select"
                                value={question.type}
                                onChange={(e) => {
                                    const value = e.target.value as 'Multiple Choice' | 'True/False' | 'Fill in the Blank';
                                    setQuestion({...question, type: value});
                                }}
                            >
                                <option value="Multiple Choice">Multiple Choice</option>
                                <option value="True/False">True/False</option>
                                <option value="Fill in the Blank">Fill in the Blank</option>
                            </select>
                        </div>

                        {/*添加描述*/}
                        <div className="mb-3">
                            <label htmlFor="question-type" className="form-label">
                                Question Description
                            </label>
                            <input
                                id="question-Description"
                                type="text"
                                className="form-control"
                                value={question.questionText}
                                onChange={(e) => setQuestion({...question, questionText: e.target.value})}
                                placeholder="Enter question Description"
                            />
                        </div>

                        {/*添加描述*/}
                        <div className="mb-3">
                            <label htmlFor="question-type" className="form-label">
                                Question points
                            </label>
                            <input
                                id="question-Description"
                                type="number"
                                className="form-control"
                                defaultValue={20}
                                onChange={(e) =>
                                    setQuestion({
                                        ...question,
                                        points: Number(e.target.value), // 将值转换为数字
                                    })
                                }
                            />
                        </div>

                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={closeModal}>
                            Cancel
                        </button>
                        <button className="btn btn-danger" onClick={handleAddNewQuestion}>
                            Add Question
                        </button>
                    </div>
                </div>
            </Modal>

            <div className="d-flex justify-content-center">
                <div>
                    <button
                        id="wd-add-questionn"
                        className="btn btn-danger "
                        onClick={openModal}
                    >
                        <IoAdd className="fs-3" /> Questions
                    </button>
                </div>
            </div>
        </div>
    )
}