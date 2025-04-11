import { useEffect, useState } from "react";
import "./App.css";
import Courses, { CourseType } from "./Courses/Courses";
import { MdAdd, MdRestartAlt } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

function App() {
  const [courses, setCourses] = useState<CourseType[]>([
    { id: 1, courseCode: "", grade: null, unit: null },
  ]);
  const [cgpa, setCgpa] = useState(0.0);
  const [lastCgpa, setLastCgpa] = useState(0.0);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  const handleAddCourse = () => {
    const newCourse = {
      id: Date.now(),
      courseCode: "",
      grade: null,
      unit: null,
    };
    setCourses((prev) => [...prev, newCourse]);
  };

  const handleDeleteCourse = (id: number) => {
    setCourses((prev) => prev.filter((course) => course.id !== id));
  };

  const handleReset = () => {
    localStorage.clear();
    setCourses([{ id: 1, courseCode: "", grade: null, unit: null }]);
    setCgpa(0.0);
    setLastCgpa(0.0);
  };

  const calculateCgpa = () => {
    let totalUnits = 0;
    let totalGradePoints = 0;

    for (const course of courses) {
      if (!course.unit || !course.grade) {
        toast.error("Fill in all fields for all courses");
        return;
      }
      totalGradePoints += course.unit * course.grade;
      totalUnits += course.unit;
    }

    if (totalUnits === 0) {
      toast.error("Total units cannot be 0");
      return;
    }

    const currentCgpa = totalGradePoints / totalUnits;
    const finalCgpa = lastCgpa ? (currentCgpa + lastCgpa) / 2 : currentCgpa;
    setCgpa(Number(finalCgpa.toFixed(2)));
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
    toast.success("CGPA calculated successfully");
  };
  const getDegreeClass = () => {
    if (cgpa >= 4.5) return "First Class";
    if (cgpa >= 3.5) return "Second Class Upper";
    if (cgpa >= 2.4) return "Second Class Lower";
    if (cgpa >= 1.5) return "Third Class";
    return "Pass";
  };

  const getColor = () => {
    if (cgpa >= 4.5) return "green";
    if (cgpa >= 3.5) return "blue";
    if (cgpa >= 2.4) return "orange";
    if (cgpa >= 1.5) return "brown";
    return "red";
  };

  useEffect(() => {
    localStorage.setItem("courses", JSON.stringify(courses));
  }, [courses]);
  useEffect(() => {
    localStorage.setItem("cgpa", JSON.stringify(cgpa));
  }, [cgpa]);
  useEffect(() => {
    localStorage.setItem("lastCgpa", JSON.stringify(lastCgpa));
  }, [lastCgpa]);

  useEffect(() => {
    const storedCourses = localStorage.getItem("courses");
    const storedCgpa = localStorage.getItem("cgpa");
    const storedLastCgpa = localStorage.getItem("lastCgpa");

    if (storedCourses) setCourses(JSON.parse(storedCourses));
    if (storedCgpa) setCgpa(JSON.parse(storedCgpa));
    if (storedLastCgpa) setLastCgpa(JSON.parse(storedLastCgpa));
  }, []);

  return (
    <div className="app">
      {showConfetti && <Confetti width={width} height={height} />}
      <Toaster />
      <h1>5-Point C/GPA Calculator</h1>
      <p className="info-text">
        Welcome to this [awesome] 5-point CGPA Calculator built by{" "}
        <a
          href="https://elooghene.vercel.app/"
          target="_blank"
          rel="noreferrer"
        >
          Elo-oghene
        </a>
        . She built it because, well because she has free will. Hope you find it
        useful.❤️{" "}
      </p>
      <div className="courses-container">
        {courses.map((course) => (
          <Courses
            key={course.id}
            course={course}
            onDelete={() => handleDeleteCourse(course.id)}
            onChange={(updatedCourses) => {
              setCourses((prev) =>
                prev.map((c) =>
                  c.id === updatedCourses.id ? updatedCourses : c
                )
              );
            }}
          />
        ))}

        <button className="add-btn" onClick={handleAddCourse}>
          <MdAdd />
        </button>
      </div>
      <div className="input-group">
        <label htmlFor="lastCgpa">Previous Cgpa</label>
        <input
          type="number"
          min="0"
          max="5"
          value={lastCgpa}
          onChange={(e) => setLastCgpa(e.target.valueAsNumber)}
        />
      </div>
      <div className="btns">
        <button className="calc-btn" onClick={calculateCgpa}>
          Calculate C/GPA
        </button>
        <button className="reset-btn" onClick={handleReset}>
          <MdRestartAlt /> Reset
        </button>
      </div>
      <div className="results" style={{ color: getColor() }}>
        <p>CGPA: {cgpa}</p>
        <p>Class: {getDegreeClass()}</p>
      </div>
    </div>
  );
}

export default App;
