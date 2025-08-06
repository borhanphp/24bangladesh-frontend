import Link from "next/link";

function CategoryTitle({ title, subnav }) {
  return (
    <div className="my-5 category-title">
      <h3>{title}</h3>

      {Array.isArray(subnav) && subnav.length > 0 && (
        <div className="subnav">
          <nav className="navbar navbar-expand-lg">
            <div className="w-100 overflow-auto">
              <ul className="navbar-nav flex-row flex-nowrap">
                {subnav.map((item, index) => (
                  <li key={index} className="nav-item">
                    <Link
                      className="nav-link fw-bold text-nowrap"
                      href={`/topic/${item.slug}`}
                    >
                      {item.name}
                      {index < subnav.length - 1 ? " | " : ""}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}

export default CategoryTitle;
