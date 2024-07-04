import { useState, Fragment } from 'react';
import { List, ListItem, ListItemText, Checkbox, Collapse, IconButton } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

interface Department {
	department: string;
	sub_departments: string[];
}

const departmentsJson: Department[] = [
	{
		department: 'customer_service',
		sub_departments: ['support', 'customer_success'],
	},
	{
		department: 'design',
		sub_departments: ['graphic_design', 'product_design', 'web_design'],
	},
	//...
];

const DepartmentList: React.FC = () => {
	const [expanded, setExpanded] = useState<Record<string, boolean>>({});
	const [selected, setSelected] = useState<Record<string, boolean>>({});

	const handleToggle = (department: string) => {
		setExpanded((prevExpanded) => ({ ...prevExpanded, [department]: !prevExpanded[department] }));
	};

	const handleSelectDepartment = (department: string) => {
		setSelected((prevSelected) => {
			const newSelected = { ...prevSelected };
			newSelected[department] = !prevSelected[department];
			departmentsJson
				.find((d) => d.department === department)
				?.sub_departments.forEach((subDepartment) => {
					newSelected[subDepartment] = newSelected[department];
				});
			return newSelected;
		});
	};

	const handleSelectSubDepartment = (department: string, subDepartment: string) => {
		setSelected((prevSelected) => {
			const newSelected = { ...prevSelected };
			newSelected[subDepartment] = !prevSelected[subDepartment];
			const allSubDepartmentsSelected = departmentsJson.find((d) => d.department === department)?.sub_departments.every((sd) => prevSelected[sd]);
			console.log(allSubDepartmentsSelected);
			if (allSubDepartmentsSelected) {
				newSelected[department] = false;
			} else if (prevSelected[department]) {
				newSelected[department] = true;
			}
			return newSelected;
		});
	};

	const isSelected = (departmentOrSubDepartment: string) => selected[departmentOrSubDepartment] || false;

	return (
		<List>
			{departmentsJson.map((department) => (
				<Fragment key={department.department}>
					<ListItem>
						<IconButton onClick={() => handleToggle(department.department)}>
							{expanded[department.department] ? <ExpandLess /> : <ExpandMore />}
						</IconButton>
						<Checkbox checked={isSelected(department.department)} onChange={() => handleSelectDepartment(department.department)} />
						<ListItemText primary={department.department} />
					</ListItem>
					<Collapse in={expanded[department.department]} timeout='auto' unmountOnExit>
						<List component='div' disablePadding>
							{department.sub_departments.map((subDepartment) => (
								<ListItem key={subDepartment}>
									<Checkbox
										checked={isSelected(subDepartment)}
										onChange={() => handleSelectSubDepartment(department.department, subDepartment)}
									/>
									<ListItemText primary={subDepartment} />
								</ListItem>
							))}
						</List>
					</Collapse>
				</Fragment>
			))}
		</List>
	);
};

export default DepartmentList;
