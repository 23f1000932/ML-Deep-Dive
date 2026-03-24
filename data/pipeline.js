export const pipelineSteps = [
  {
    id: 1,
    title: "Problem Understanding",
    icon: "🎯",
    description: "Define the business problem, success metrics, and constraints before writing any code.",
    interviewAnswer: "I always start by understanding the business problem: What are we trying to predict? What metric matters? What's the baseline? For churn prediction, the goal was reducing customer attrition, and F1-score was chosen because both false positives (wasted retention budget) and false negatives (lost customers) had real costs.",
    mistakes: ["Jumping to modeling without understanding the problem", "Choosing the wrong success metric", "Not establishing a baseline"],
    tradeoffs: "Spending too much time here delays delivery, but skipping it leads to solving the wrong problem entirely."
  },
  {
    id: 2,
    title: "Data Collection",
    icon: "📦",
    description: "Gather relevant data from databases, APIs, or external sources. Assess data quality and completeness.",
    interviewAnswer: "I identify all available data sources and assess their quality. Key questions: How much data do we have? Is it representative? Are there temporal biases? For the cinema project, I collected historical attendance data with corresponding metadata like holidays, weather, and movie features.",
    mistakes: ["Using data that doesn't represent production conditions", "Selection bias in data collection", "Not checking for data quality issues early"],
    tradeoffs: "More data sources = richer signal but more complexity and potential inconsistencies."
  },
  {
    id: 3,
    title: "Data Cleaning",
    icon: "🧹",
    description: "Handle missing values, duplicates, outliers, and inconsistent formats.",
    interviewAnswer: "I handle missing values based on mechanism (MCAR/MAR/MNAR), remove duplicates, fix inconsistent formats. I also create missingness indicators when the fact of being missing is informative. All imputation is fitted on training data only to prevent leakage.",
    mistakes: ["Imputing with full-dataset statistics (leakage)", "Dropping too many rows with missing values", "Not investigating WHY data is missing"],
    tradeoffs: "Aggressive cleaning removes noise but may lose signal. Light cleaning preserves data but may introduce noise."
  },
  {
    id: 4,
    title: "EDA (Exploratory Data Analysis)",
    icon: "🔍",
    description: "Visualize distributions, correlations, and patterns. Develop intuition about the data.",
    interviewAnswer: "I examine distributions, correlations, class balance, and temporal patterns. For churn, I found geography was a strong predictor — Germany had significantly higher churn. This informed feature engineering decisions.",
    mistakes: ["Skipping EDA and going straight to modeling", "Not checking for class imbalance", "Not detecting multicollinearity"],
    tradeoffs: "Deep EDA takes time but prevents costly modeling mistakes. The key is focusing on actionable insights."
  },
  {
    id: 5,
    title: "Feature Engineering",
    icon: "⚙️",
    description: "Create new features, encode categoricals, scale numericals, and handle transformations.",
    interviewAnswer: "I encode categoricals (OHE for nominal, label for ordinal), scale features for distance-based models (not needed for trees), and create domain-specific features. For cinema, I engineered lag features, rolling averages, and holiday indicators.",
    mistakes: ["One-hot encoding high-cardinality features", "Scaling before splitting", "Not creating domain-specific features"],
    tradeoffs: "More features can improve performance but increase dimensionality and overfitting risk."
  },
  {
    id: 6,
    title: "Model Selection",
    icon: "🧠",
    description: "Choose appropriate algorithms based on problem type, data size, and requirements.",
    interviewAnswer: "I consider the problem type, data size, interpretability needs, and inference speed requirements. For tabular data, I typically start with XGBoost or LightGBM as strong baselines, then compare against simpler models to understand if complexity is justified.",
    mistakes: ["Starting with deep learning on small tabular data", "Not trying simple baselines first", "Ignoring interpretability requirements"],
    tradeoffs: "Complex models (XGBoost) usually win on accuracy, but simple models (Logistic Regression) are faster and more interpretable."
  },
  {
    id: 7,
    title: "Training",
    icon: "🏋️",
    description: "Train models with proper cross-validation, avoiding data leakage.",
    interviewAnswer: "I use Stratified K-Fold for classification (preserves class distribution) and TimeSeriesSplit for temporal data. All preprocessing is done within the CV loop using sklearn Pipeline to prevent leakage. I set aside a final test set that's never touched during development.",
    mistakes: ["Data leakage through preprocessing before CV", "Using standard K-Fold on time-series", "Evaluating on training data"],
    tradeoffs: "More CV folds = more robust estimates but longer training time."
  },
  {
    id: 8,
    title: "Hyperparameter Tuning",
    icon: "🎛️",
    description: "Optimize model hyperparameters using systematic search methods.",
    interviewAnswer: "I use a combination of RandomizedSearchCV for initial exploration and targeted GridSearchCV for fine-tuning. For XGBoost, I follow a specific tuning order: max_depth + min_child_weight → subsample + colsample_bytree → gamma → lambda/alpha → learning_rate (lower it last).",
    mistakes: ["Tuning learning_rate first (should be last)", "Not using early stopping", "Overfitting to validation set through excessive tuning"],
    tradeoffs: "Extensive tuning squeezes out small gains at the cost of significant compute time. Bayesian optimization is more efficient than grid search."
  },
  {
    id: 9,
    title: "Evaluation & Deployment",
    icon: "🚀",
    description: "Final evaluation on held-out test set, then deploy with monitoring.",
    interviewAnswer: "I evaluate on the held-out test set only once — using the metric aligned with business goals. I compare against the baseline. For deployment, I monitor for data drift, concept drift, and performance degradation. I set up alerts for when model performance drops below a threshold.",
    mistakes: ["Evaluating on test set multiple times (it becomes a validation set)", "Not monitoring model performance post-deployment", "Not having a fallback/baseline model"],
    tradeoffs: "Batch inference is simpler but has higher latency. Real-time inference requires more infrastructure but enables immediate predictions."
  }
];
