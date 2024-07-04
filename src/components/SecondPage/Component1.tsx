import React from 'react';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
interface Data {
	useId: number;
	id: number;
	title: string;
	body: string;
}

const Component1: React.FC = () => {
	const [posts, setPosts] = useState<Data[]>([]);
	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('https://jsonplaceholder.typicode.com/todos/');
			const data = (await response.json()) as Data[];
			console.log(data);
			setPosts(data);
		};
		fetchData();
	}, []);
	const columns = [
		{
			field: 'id',
			headerName: 'ID',
			width: 70,
		},
		{
			field: 'title',
			headerName: 'Title',
			width: 300,
		},
		{
			field: 'body',
			headerName: 'Body',
			width: 500,
		},
	];
	return (
		<div>
			<h2>List Of Posts</h2>
			<div
				style={{
					height: 400,
					width: '100%',
				}}
			>
				<DataGrid rows={posts} columns={columns} pageSize={[5]} rowsPerPageOptions={[5, 10, 20]} />
			</div>
		</div>
	);
};

export default Component1;
