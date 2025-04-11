import "./Courses.css";
import { MdDelete } from "react-icons/md";


export interface CourseType {
  id: number;
  courseCode: string;
  grade: number | null;
  unit: number | null;
}

interface CoursesProps {
  course: CourseType;
  onDelete: () => void;
  onChange: (updatedCourses: CourseType) => void;
}

const Courses = ({ course, onDelete, onChange }: CoursesProps) => {
  return (
    <div>
      <div className="courses">
        <div>
          <h3>Courses</h3>
          <input
            type="text"
            placeholder="GST211"
            value={course.courseCode}
            onChange={(e) =>
              onChange({ ...course, courseCode: e.target.value })
            }
          />
        </div>
        <div>
          <h3>Grade</h3>
          <select name="grade" id="grade" value={course.grade === null ? "" : course.grade}  onChange={(e) =>
              onChange({ ...course,grade: Number(e.target.value) })
            }>
            <option value=""></option>
            <option value={5}>A</option>
            <option value={4}>B</option>
            <option value={3}>C</option>
            <option value={2}>D</option>
            <option value={1}>F</option>
          </select>
        </div>
        <div>
          <h3>Unit</h3>
          <input
            type="number"
            min={0}
            max={4}
            placeholder="2"
            value={course.unit === null ? "" : course.unit}
            onChange={(e) =>
              onChange({ ...course, unit: Number(e.target.value) })
            }
          />
        </div>
        <button className="delete" onClick={onDelete}><MdDelete /></button>
      </div>
    </div>
  );
};

export default Courses;
