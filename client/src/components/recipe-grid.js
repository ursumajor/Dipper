import React from 'react';
import { Link } from 'react-router-dom';

const RecipeGrid = ({ recipes, emptyMessage = "No recipes yet." }) => {
    if (!recipes || recipes.length === 0) {
        return <p>{emptyMessage}</p>;
    }

    return (
        <div className="d-flex flex-wrap">
            {recipes.map((recipe) => (
                <Link
                    key={recipe.id}
                    to={`/recipes/${recipe.id}`}
                    className="text-decoration-none text-dark m-2"
                >
                    <div className="card shadow-sm h-100" style={{ width: "250px" }}>
                        <img
                            className="card-img-top"
                            src={recipe.image_url || "/no-image.svg"}
                            alt={recipe.title}
                            style={{ height: "200px", objectFit: "cover" }}
                        />
                        <div className="card-body">
                            <h5
                                className="card-title text-truncate mb-1"
                                style={{ lineHeight: 1.4, paddingBottom: "2px" }}
                            >
                                {recipe.title}
                            </h5>
                            {recipe.username && (
                                <p className="card-text text-muted small mb-0">by {recipe.username}</p>
                            )}
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default RecipeGrid;
