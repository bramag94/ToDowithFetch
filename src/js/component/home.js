import React, { useState, useEffect } from "react";
import { Alert } from "bootstrap";

//create your first component
export function Home() {
	const [tareas, setTareas] = useState("");
	const [lista, setLista] = useState([]);

	var url = "https://assets.breatheco.de/apis/fake/todos/user/bramag94";

	const loadTodo = () => {
		fetch(url, {
			method: "GET",
			headers: { "Content-Type": "application/json" }
		})
			.then(res => res.json())
			.then(data => {
				setLista(data);

				//console.log({ data });
			}) //cargando la info
			.catch(error => console.error("Error:", error.message));
	};
	const updatetodo = lista => {
		fetch(url, {
			method: "PUT",
			body: JSON.stringify(lista),
			headers: { "Content-Type": "application/json" }
		})
			.then(res => res.json())
			.then(data => {
				loadTodo();
				alert(data.result);
				//console.log({ data });
			}) //cargando la info
			.catch(error => console.error("Error:", error.message));
	};
	const deletetodo = lista => {
		fetch(url, {
			method: "DELETE",
			body: JSON.stringify(lista),
			headers: { "Content-Type": "application/json" }
		})
			.then(res => res.json())
			.then(data => {
				loadTodo();
				alert(data.result);
				//console.log({ data });
			}) //cargando la info
			.catch(error => console.error("Error:", error.message));
	};

	useEffect(() => {
		loadTodo();
	}, []); //me llama a todo una vez está cargado.

	return (
		<div className="text-center mt-5">
			<h1>TO DO LIST </h1>

			<input
				type="text"
				placeholder="Ingrese sus datos"
				onChange={e => setTareas(e.target.value)}
				value={tareas}
				onKeyPress={e => {
					if (e.key == "Enter") {
						let obj = { label: tareas, done: false };

						setLista(lista.concat(obj));
						setTareas("");
						console.log({ lista });
					}
				}}
			/>
			{lista.map((item, index) => {
				return (
					<li
						onDoubleClick={() => {
							setLista(
								lista.filter(
									(itemf, indexf) => indexf !== index
								)
							);
						}}
						key={index}>
						{" "}
						{item.label}
					</li>
				);
			})}

			<button
				onClick={() => {
					updatetodo(lista);
				}}>
				Update
			</button>
			<span></span>
		</div>
	);
}
