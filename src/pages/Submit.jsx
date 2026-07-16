import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Plus, Trash2, ChevronRight, ChevronLeft } from 'lucide-react';
import { useRecipes } from '@/context/RecipeContext';

function Submit() {
  const { user } = useAuth();
  const { addRecipe } = useRecipes();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    prepTime: '',
    servings: '',
    category: 'Dinner',
    difficulty: 'Easy',
    image: '',
    ingredients: [{ name: '', qty: '', unit: '' }],
    steps: [''],
  });

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateIngredient = (index, field, value) => {
    const updated = [...formData.ingredients];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, ingredients: updated }));
  };

  const addIngredient = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: '', qty: '', unit: '' }],
    }));
  };

  const removeIngredient = (index) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }));
  };

  const updateStep = (index, value) => {
    const updated = [...formData.steps];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, steps: updated }));
  };

  const addStep = () => {
    setFormData((prev) => ({ ...prev, steps: [...prev.steps, ''] }));
  };

  const removeStep = (index) => {
    setFormData((prev) => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== index),
    }));
  };

 const handlePublish = () => {
  addRecipe({
    title: formData.title,
    description: formData.description,
    prepTime: `${formData.prepTime} mins`,
    cookTime: '0 mins',
    servings: Number(formData.servings),
    category: formData.category,
    difficulty: formData.difficulty,
    image: formData.image,
    ingredients: formData.ingredients.map((i) => `${i.qty} ${i.unit} ${i.name}`),
    steps: formData.steps,
  });
  navigate('/recipes');
};

  const inputClass = "w-full border border-amber-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white text-stone-800";

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-stone-800 mb-2">Share Your Masterpiece</h1>
        <p className="text-stone-400 text-sm">Every great meal starts with a story. Help others recreate your favorite dishes by filling out this simple form.</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-2 mb-10">
        {['The Basics', 'Recipe Details', 'Review & Publish'].map((label, index) => (
          <div key={label} className="flex items-center gap-2">
            <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              step === index + 1
                ? 'bg-amber-500 text-white'
                : step > index + 1
                ? 'bg-amber-100 text-amber-600'
                : 'bg-stone-100 text-stone-400'
            }`}>
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold border border-current">
                {index + 1}
              </span>
              {label}
            </div>
            {index < 2 && <div className="w-8 h-px bg-stone-200" />}
          </div>
        ))}
      </div>

      {/* Step 1 — The Basics */}
      {step === 1 && (
        <div className="bg-white border border-amber-200 rounded-xl p-6 shadow-sm">
          <h2 className="font-semibold text-stone-800 mb-4 flex items-center gap-2">
            <span className="text-amber-500">🍴</span> The Basics
          </h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-stone-600 block mb-1.5">Recipe Title</label>
              <input
                type="text"
                placeholder="e.g. Grandma's Secret Halo-Halo"
                value={formData.title}
                onChange={(e) => updateField('title', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-stone-600 block mb-1.5">Short Description</label>
              <textarea
                placeholder="Tell us the story behind this dish..."
                value={formData.description}
                onChange={(e) => updateField('description', e.target.value)}
                rows={3}
                className={inputClass}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-stone-600 block mb-1.5">Preparation Time (mins)</label>
                <input
                  type="number"
                  placeholder="e.g. 30"
                  value={formData.prepTime}
                  onChange={(e) => updateField('prepTime', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-stone-600 block mb-1.5">Servings</label>
                <input
                  type="number"
                  placeholder="e.g. 4"
                  value={formData.servings}
                  onChange={(e) => updateField('servings', e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button
              onClick={() => setStep(2)}
              disabled={!formData.title || !formData.description}
              className="bg-amber-500 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              Continue <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2 — Recipe Details */}
      {step === 2 && (
        <div className="bg-white border border-amber-200 rounded-xl p-6 shadow-sm space-y-6">
          
          {/* Ingredients */}
          <div>
            <h2 className="font-semibold text-stone-800 mb-4 flex items-center gap-2">
              <span className="text-amber-500"></span> Ingredients
            </h2>
            <div className="space-y-2">
              {formData.ingredients.map((ing, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder="Ingredient name (e.g. Flour)"
                    value={ing.name}
                    onChange={(e) => updateIngredient(index, 'name', e.target.value)}
                    className={`${inputClass} flex-1`}
                  />
                  <input
                    type="text"
                    placeholder="Qty"
                    value={ing.qty}
                    onChange={(e) => updateIngredient(index, 'qty', e.target.value)}
                    className={`${inputClass} w-20`}
                  />
                  <select
                    value={ing.unit}
                    onChange={(e) => updateIngredient(index, 'unit', e.target.value)}
                    className={`${inputClass} w-24`}
                  >
                    <option value="">Unit</option>
                    <option>cups</option>
                    <option>tbsp</option>
                    <option>tsp</option>
                    <option>grams</option>
                    <option>kg</option>
                    <option>ml</option>
                    <option>pieces</option>
                  </select>
                  {formData.ingredients.length > 1 && (
                    <button onClick={() => removeIngredient(index)} className="text-red-400 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={addIngredient}
              className="mt-3 text-amber-600 text-sm flex items-center gap-1 hover:text-amber-700"
            >
              <Plus className="h-4 w-4" /> Add Ingredient
            </button>
          </div>

          {/* Instructions */}
          <div>
            <h2 className="font-semibold text-stone-800 mb-4 flex items-center gap-2">
              <span className="text-amber-500"></span> Instructions
            </h2>
            <div className="space-y-2">
              {formData.steps.map((step, index) => (
                <div key={index} className="flex gap-2 items-start">
                  <span className="bg-amber-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center mt-2.5 shrink-0">
                    {index + 1}
                  </span>
                  <textarea
                    placeholder={`Describe step ${index + 1}...`}
                    value={step}
                    onChange={(e) => updateStep(index, e.target.value)}
                    rows={2}
                    className={`${inputClass} flex-1`}
                  />
                  {formData.steps.length > 1 && (
                    <button onClick={() => removeStep(index)} className="text-red-400 hover:text-red-600 mt-2.5">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={addStep}
              className="mt-3 text-amber-600 text-sm flex items-center gap-1 hover:text-amber-700"
            >
              <Plus className="h-4 w-4" /> Add Step
            </button>
          </div>

          {/* Classification */}
          <div>
            <h2 className="font-semibold text-stone-800 mb-4 flex items-center gap-2">
              <span className="text-amber-500"></span> Classification
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-stone-600 block mb-1.5">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => updateField('category', e.target.value)}
                  className={inputClass}
                >
                  <option>Breakfast</option>
                  <option>Lunch</option>
                  <option>Dinner</option>
                  <option>Desserts</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-stone-600 block mb-1.5">Difficulty</label>
                <div className="flex gap-2">
                  {['Easy', 'Medium', 'Hard'].map((d) => (
                    <button
                      key={d}
                      onClick={() => updateField('difficulty', d)}
                      className={`flex-1 py-2 rounded-lg text-sm border transition-colors ${
                        formData.difficulty === d
                          ? 'bg-amber-500 text-white border-amber-500'
                          : 'bg-white text-stone-600 border-amber-200 hover:bg-amber-50'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="text-sm font-medium text-stone-600 block mb-1.5">Image URL (optional)</label>
            <input
              type="url"
              placeholder="https://example.com/image.jpg"
              value={formData.image}
              onChange={(e) => updateField('image', e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="flex justify-between pt-2">
            <button
              onClick={() => setStep(1)}
              className="border border-amber-200 text-stone-600 px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-amber-50 transition-colors flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" /> Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="bg-amber-500 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors flex items-center gap-2"
            >
              Continue <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3 — Review & Publish */}
      {step === 3 && (
        <div className="bg-white border border-amber-200 rounded-xl p-6 shadow-sm">
          <h2 className="font-semibold text-stone-800 mb-6">Review your recipe before publishing</h2>

          {formData.image && (
            <img src={formData.image} alt={formData.title} className="w-full h-56 object-cover rounded-xl mb-6" />
          )}

          <h1 className="text-2xl font-bold text-stone-800 mb-2">{formData.title}</h1>
          <p className="text-stone-500 text-sm mb-4">{formData.description}</p>

          <div className="flex gap-6 text-sm text-stone-500 mb-6">
            <span> {formData.prepTime} mins prep</span>
            <span> {formData.servings} servings</span>
            <span> {formData.category}</span>
            <span> {formData.difficulty}</span>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-stone-800 mb-3">Ingredients</h3>
            <ul className="space-y-1">
              {formData.ingredients.map((ing, i) => (
                <li key={i} className="text-sm text-stone-600 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                  {ing.qty} {ing.unit} {ing.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="font-semibold text-stone-800 mb-3">Preparation Steps</h3>
            <ol className="space-y-2">
              {formData.steps.map((s, i) => (
                <li key={i} className="text-sm text-stone-600 flex gap-3">
                  <span className="bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ol>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setStep(2)}
              className="border border-amber-200 text-stone-600 px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-amber-50 transition-colors flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" /> Back
            </button>
            <button
              onClick={handlePublish}
              className="bg-amber-500 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors"
            >
              Publish Recipe →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Submit;