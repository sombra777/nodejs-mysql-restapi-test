import { pool } from "../db.js";

export const getEmployees = async (req, res)=> {
    try {
        const [rows] = await pool.query('SELECT * FROM employees');
        res.json(rows);
        
    } catch (error) {
        return res.status(500).json({
            mesagge: "something goes wrong"
        });
    }
}

export const getEmployee = async (req, res)=> {
   try {
        const [rows] = await pool.query('SELECT * FROM employees WHERE id = ?', [req.params.id]);

        if(rows.length <= 0) return res.status(404).json({
            mesagge: 'Employees no found'
        })

        res.json(rows[0]);
   } catch (error) {
    return res.status(500).json({
        mesagge: "something goes wrong"
    });
   }
}

export const postEmployees = async (req, res)=>  {
    const {name, salary} = req.body;
    try {
        const [rows] =await pool.query('INSERT INTO employees (name,salary) VALUES (?, ?)',[name, salary])  
        res.send({
            id: rows.insertId,
            name,
            salary,
        })
    } catch (error) {
        res.status(500).json({
            message: "something goes wrong"
        })
    }
};

export const putEmployees = async (req, res)=>{
    const {id} = req.params;
    const {name,salary} = req.body;
    try {
        const [result] = await pool.query('UPDATE employees SET name = IFNULL(?,name), salary = IFNULL(?,salary) WHERE id = ?', [name, salary, id])
        if(result.affectedRows === 0)return res.status(404).json({
            mesagge: 'Employees no found'
        })

        const [rows] = await pool.query('SELECT * FROM employees WHERE id = ?', [id])
        console.log(result);
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({
            message: "something goes wrong"
        })
    }
};

export const deleteEmployees = async(req, res)=> {
    try {
        const [result] =await pool.query('DELETE FROM employees WHERE id = ? ', [req.params.id]);
        if(result.affectedRows <= 0) return res.status(404).json({
            mesagge: 'Employees no found'
        })
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({
            message: "something goes wrong"
        })
    }
};
