export const topics = [
  // ─── Phase 2: ML Fundamentals ─────────────────────────────────
  {
    id: "ml-types",
    title: "ML Types & Taxonomy",
    tagline: "The foundation of every ML conversation",
    phase: "Fundamentals",
    phaseNum: 2,
    color: "purple",
    sections: [
      {
        icon: "📖",
        title: "Technical Definition",
        content: `Machine Learning is a subset of AI where algorithms learn patterns from data without being explicitly programmed. It is divided into paradigms based on the nature of the training signal.

**Supervised Learning:** The model is trained on labeled data — each input X has a known output Y. The model learns a mapping f(X) → Y by minimizing a loss function.

**Unsupervised Learning:** No labels. The model finds hidden structure in unlabeled data — clusters, associations, dimensionality reduction.

**Semi-supervised Learning:** A small amount of labeled data + large amount of unlabeled data. Common in real-world where labeling is expensive.

**Reinforcement Learning:** An agent takes actions in an environment to maximize cumulative reward. No dataset — it learns by trial and error.

**Self-supervised Learning:** Labels are derived from the data itself (e.g., predict the next word in a sentence). Powers modern LLMs.`
      },
      {
        icon: "🧩",
        title: "Classification vs Regression",
        content: `**Classification** — Output is a discrete class label. Binary (spam/not spam) or multiclass (digit 0–9).

**Regression** — Output is a continuous value. Predict house price, temperature, revenue.

> **Interview trick:** "Is predicting customer churn classification or regression?" → Classification (binary: churn/no-churn). But predicting the *probability* of churn uses a regression-like output (sigmoid) inside a classification model.`
      },
      {
        icon: "🗂️",
        title: "When to Use What",
        content: `- **Supervised** — You have labeled historical data and want predictions. Most business problems: fraud detection, churn, price prediction.
- **Unsupervised** — No labels, exploratory. Customer segmentation, anomaly detection, topic modeling.
- **RL** — Sequential decision-making with delayed rewards. Games, robotics, recommendation systems.
- **Self-supervised** — Massive unlabeled corpora. NLP pre-training (BERT, GPT).`
      }
    ],
    interviewQA: [
      {
        q: "What is the difference between classification and regression?",
        a: "Classification predicts a discrete class label (e.g., churn/no-churn), while regression predicts a continuous numerical value (e.g., revenue). Internally, classifiers often estimate a probability using regression-like mechanisms (sigmoid, softmax), but the final output is discretized at a threshold."
      },
      {
        q: "Can a regression algorithm solve a classification problem?",
        a: "Yes. Logistic Regression is technically a regression algorithm that outputs a probability between 0 and 1, then applies a threshold (usually 0.5) to produce a binary class. Similarly, SVR can be adapted. The key is: regression outputs a score, a threshold converts it to a label."
      },
      {
        q: "Why can't we use unsupervised learning for churn prediction?",
        a: "Unsupervised methods don't know what \"churn\" means — they just find clusters. Without labeled examples, the algorithm can't distinguish churners from non-churners. You'd get customer segments, not churn predictions. You need historical labeled data (did this customer churn?) to train a supervised model."
      }
    ],
    interviewMode: {
      howToAnswer: "Start by defining ML, then walk through each paradigm with a one-line example. Show you know the taxonomy by mentioning semi-supervised and self-supervised — most candidates forget these.",
      followUps: [
        "What's the difference between semi-supervised and self-supervised?",
        "Give a real-world example of reinforcement learning.",
        "Is clustering a supervised or unsupervised technique?"
      ],
      traps: [
        "Confusing classification with regression when the output is a probability",
        "Not knowing that Logistic Regression is actually a classifier",
        "Claiming unsupervised learning can replace supervised when labels are unavailable"
      ]
    }
  },
  {
    id: "bias-variance",
    title: "Bias-Variance Tradeoff",
    tagline: "The most fundamental concept in all of ML",
    phase: "Fundamentals",
    phaseNum: 2,
    color: "purple",
    sections: [
      {
        icon: "📖",
        title: "Technical Definition",
        content: `Bias-Variance Tradeoff describes the tension between two sources of model error.

\`Total Error = Bias² + Variance + Irreducible Noise\`

**Bias** — Error from wrong assumptions in the model. A high-bias model is too simple and misses the true pattern. It underfits the data.

**Variance** — Error from sensitivity to fluctuations in the training set. A high-variance model memorizes noise and fails on new data. It overfits.

**Irreducible Error** — Noise inherent in the data. No model can eliminate this. It sets the floor on your error.`
      },
      {
        icon: "⚖️",
        title: "The Tradeoff Explained",
        content: `Increasing model complexity **decreases bias** (model fits training data better) but **increases variance** (model becomes sensitive to training data).

**Underfitting (High Bias, Low Variance):** Linear model on non-linear data. Train error high, Test error high, Train ≈ Test.

**Overfitting (Low Bias, High Variance):** Deep tree with no pruning. Train error low, Test error high, Train << Test.

**Sweet Spot:** Train error reasonably low. Test error close to Train error.`
      },
      {
        icon: "🔧",
        title: "How to Fix Each",
        content: `**Fixing High Bias (underfitting):**
- Use a more complex model (tree, ensemble)
- Add more features / polynomial features
- Reduce regularization
- Train longer (for neural nets)

**Fixing High Variance (overfitting):**
- Get more training data
- Reduce model complexity (lower depth, fewer features)
- Add regularization (L1/L2, dropout)
- Use ensemble methods (bagging reduces variance)
- Early stopping

> Random Forest reduces variance by averaging many high-variance trees. Boosting reduces bias by sequentially correcting errors.`
      }
    ],
    interviewQA: [
      {
        q: "How do you know if your model is overfitting or underfitting?",
        a: "Compare training error vs validation error. If training error is low but validation error is high → overfitting (high variance). If both errors are high → underfitting (high bias). If both errors are similar and low → good fit. Learning curves (error vs training size) also reveal this pattern."
      },
      {
        q: "Does adding more data always help?",
        a: "More data primarily reduces variance (overfitting), not bias. If your model is underfitting (high bias), adding more data won't help because the model's assumption is fundamentally wrong. To fix bias, you need a more expressive model or better features."
      },
      {
        q: "How does regularization affect bias and variance?",
        a: "Regularization increases bias (constrains the model) but decreases variance (prevents overfitting). Too much regularization → high bias (underfitting). The strength (lambda/alpha) is a hyperparameter you tune via cross-validation."
      }
    ],
    interviewMode: {
      howToAnswer: "Draw the classic U-shaped curve: x-axis = model complexity, y-axis = error. Show training error decreasing, test error first decreasing then increasing. The gap is variance, the floor is bias + irreducible error.",
      followUps: [
        "If you add more data, which component of error decreases?",
        "Does ensemble learning reduce bias or variance?",
        "What's the relationship between regularization strength and bias-variance?"
      ],
      traps: [
        "Saying 'more data always helps' — it doesn't help high bias",
        "Not mentioning irreducible error as the error floor",
        "Confusing overfitting with underfitting symptoms"
      ]
    }
  },
  {
    id: "cross-validation",
    title: "Cross-Validation",
    tagline: "How you honestly evaluate a model's performance",
    phase: "Fundamentals",
    phaseNum: 2,
    color: "purple",
    sections: [
      {
        icon: "📖",
        title: "Technical Definition",
        content: `Cross-Validation is a model evaluation technique that partitions data into complementary subsets, trains on some and validates on others, repeating multiple times to get a robust performance estimate.

Without cross-validation, you risk evaluating on the same data you trained on (data leakage) or having a lucky/unlucky train-test split that doesn't represent reality.`
      },
      {
        icon: "🔁",
        title: "Types of Cross-Validation",
        content: `**Holdout (simple split):** 80% train / 20% test. Fast but unreliable with small datasets.

**K-Fold CV:** Split data into K equal folds. Train on K-1 folds, test on the remaining 1. Repeat K times. Average the scores. Typically K=5 or K=10.

\`Final score = mean(score₁, score₂, ..., scoreₖ)\`

**Stratified K-Fold:** Same as K-Fold but each fold preserves the class distribution. **Essential for imbalanced datasets.**

**TimeSeriesSplit:** For time-series data, you can't shuffle. Each split uses past data to train and future data to validate.

> TimeSeriesSplit prevents data leakage: you never train on future data to predict the past. This is the biggest mistake beginners make with time-series.

**Leave-One-Out (LOOCV):** K = N (each sample is its own test fold). Very expensive but useful for tiny datasets.`
      },
      {
        icon: "⚠️",
        title: "Data Leakage — The Critical Trap",
        content: `Data leakage is when information from outside the training set influences the model. It causes artificially high CV scores that don't generalise.

**Common leakage examples:**
- Scaling the entire dataset before splitting (test statistics leak into training)
- Filling missing values with the overall mean (includes test set mean)
- Feature derived from the target (e.g., "average churn rate per region" computed on full dataset)

**Fix:** Always fit preprocessing (scaler, imputer) on training fold only. Apply (transform) to test fold. Use \`Pipeline\` in sklearn to enforce this.`
      }
    ],
    interviewQA: [
      {
        q: "Why did you use TimeSeriesSplit in your cinema project?",
        a: "TimeSeriesSplit respects temporal ordering. Standard K-Fold shuffles data randomly, which would allow the model to train on future data and predict the past — a form of data leakage. Since cinema demand is time-dependent, TimeSeriesSplit ensures each validation fold is always chronologically after the training fold."
      },
      {
        q: "Why use Stratified K-Fold for churn prediction?",
        a: "In churn datasets, the positive class (churners) is rare — maybe 10-15%. Standard K-Fold might put very few or no churners in a fold by chance. Stratified K-Fold ensures each fold has the same class ratio as the full dataset, making scores more stable."
      },
      {
        q: "What is the difference between validation set and test set?",
        a: "The validation set is used during development to tune hyperparameters. The test set is a completely held-out final evaluation set — touched only once. If you tune on the test set, it effectively becomes a validation set and you'll overestimate performance."
      }
    ],
    interviewMode: {
      howToAnswer: "Explain K-Fold step by step. Mention stratification for imbalanced data, TimeSeriesSplit for temporal data. Always mention data leakage prevention.",
      followUps: [
        "How do you prevent data leakage during cross-validation?",
        "When would you use LOOCV over 5-fold CV?",
        "Should preprocessing be done inside or outside the CV loop?"
      ],
      traps: [
        "Not knowing that scaling before splitting causes leakage",
        "Using standard K-Fold on time-series data",
        "Confusing validation set with test set"
      ]
    }
  },
  {
    id: "evaluation-metrics",
    title: "Evaluation Metrics",
    tagline: "Choosing the wrong metric can sink your project",
    phase: "Fundamentals",
    phaseNum: 2,
    color: "purple",
    sections: [
      {
        icon: "📖",
        title: "The Confusion Matrix",
        content: `A confusion matrix summarizes classification results across True Positives (TP), True Negatives (TN), False Positives (FP), and False Negatives (FN).

**TP:** Predicted positive, actually positive (correctly caught churner)
**TN:** Predicted negative, actually negative (correctly retained customer)
**FP:** Predicted positive, actually negative (false alarm — Type I error)
**FN:** Predicted negative, actually positive (missed churner — Type II error)`
      },
      {
        icon: "📐",
        title: "Classification Metrics",
        content: `\`Accuracy  = (TP + TN) / (TP + TN + FP + FN)\`

Misleading on imbalanced data. If 95% are non-churners, always saying "no churn" gets 95% accuracy but is useless.

\`Precision = TP / (TP + FP)   — "When I say positive, how often am I right?"\`
\`Recall    = TP / (TP + FN)   — "Of all actual positives, how many did I catch?"\`
\`F1-Score  = 2 × (Precision × Recall) / (Precision + Recall)\`

> **Precision vs Recall tradeoff:** Lowering the threshold increases Recall but decreases Precision. You optimize based on business context.

**AUC-ROC:** Area Under the ROC Curve. Threshold-independent. AUC = 1.0 is perfect, 0.5 is random.

**AUC-PR:** Better than AUC-ROC for highly imbalanced data.`
      },
      {
        icon: "📏",
        title: "Regression Metrics",
        content: `\`MAE  = mean(|y_pred - y_actual|)         — easy to interpret, robust to outliers\`
\`MSE  = mean((y_pred - y_actual)²)        — penalises large errors heavily\`
\`RMSE = √MSE                              — same units as target, most common\`
\`R²   = 1 - SS_res/SS_tot                 — proportion of variance explained\``
      }
    ],
    interviewQA: [
      {
        q: "Why did you use F1 for churn prediction instead of accuracy?",
        a: "Churn datasets are imbalanced — churners are a small minority. Accuracy would be misleadingly high even if the model ignores churners entirely. F1-score is the harmonic mean of Precision and Recall, giving a balanced view of performance on the minority class."
      },
      {
        q: "When would you prefer AUC-ROC over F1?",
        a: "AUC-ROC is threshold-independent — useful when you don't know the operating threshold yet. F1 is threshold-specific (usually 0.5). Use AUC-ROC for model ranking/comparison, F1 when you have a fixed business threshold."
      },
      {
        q: "What is RMSE and why is it preferred over MAE?",
        a: "RMSE penalizes large errors more heavily than MAE because errors are squared before averaging. In domains where large errors are very costly, RMSE captures this severity. MAE is more robust to outliers."
      }
    ],
    interviewMode: {
      howToAnswer: "Start with confusion matrix, derive all metrics from it. Show you understand the precision-recall tradeoff with a real example (churn). Mention when each metric is appropriate.",
      followUps: [
        "How do you choose the right threshold for classification?",
        "What's the difference between macro and micro F1?",
        "When is AUC-PR better than AUC-ROC?"
      ],
      traps: [
        "Using accuracy on imbalanced data without acknowledging the problem",
        "Not knowing the precision-recall tradeoff",
        "Confusing MAE robustness to outliers with MSE's sensitivity"
      ]
    }
  },
  {
    id: "feature-engineering",
    title: "Feature Engineering",
    tagline: "The most impactful skill in applied ML",
    phase: "Fundamentals",
    phaseNum: 2,
    color: "purple",
    sections: [
      {
        icon: "📖",
        title: "Technical Definition",
        content: `Feature Engineering is the process of transforming raw data into informative, model-friendly representations. It includes creating new features, encoding categorical variables, handling missing values, and scaling numerical features.

No matter how powerful your algorithm, garbage in = garbage out.`
      },
      {
        icon: "🔢",
        title: "Encoding Categorical Variables",
        content: `**One-Hot Encoding (OHE):** Creates binary columns for each category. Good for nominal categories with no order. Creates many columns for high-cardinality features.

**Label Encoding:** Assigns integer to each category (cat→0, dog→1). Use only for ordinal features (low/medium/high).

**Target Encoding:** Replace category with mean target value. Powerful but risks leakage — must be done within CV folds.

> High cardinality problem: A "city" column with 1000 unique values → OHE creates 1000 binary columns. Use Target Encoding or embedding instead.`
      },
      {
        icon: "📊",
        title: "Scaling & Normalization",
        content: `**StandardScaler (Z-score):** \`(x - mean) / std\`. Output has mean=0, std=1. Use for algorithms assuming Gaussian distribution.

**MinMaxScaler:** \`(x - min) / (max - min)\`. Scales to [0,1]. Use for neural networks, KNN.

**RobustScaler:** Uses median and IQR — robust to outliers.

> Tree-based models (XGBoost, LightGBM, Random Forest) are scale-invariant. They split on thresholds, not distances.`
      },
      {
        icon: "🔍",
        title: "Missing Value Imputation",
        content: `**Simple imputation:** Fill with mean (numerical), mode (categorical), or a fixed value.

**KNN Imputation:** Fill using K nearest neighbours. More accurate but expensive.

**Model-based:** Train a model to predict the missing feature.

**Missingness as a feature:** Create a binary flag "was_value_missing". Sometimes the fact of missingness is itself informative.

⚠️ Never impute before splitting train/test — the mean from the full dataset leaks test set information.`
      }
    ],
    interviewQA: [
      {
        q: "Why did you use One-Hot Encoding in your churn project?",
        a: "The categorical features (geography, gender) had no inherent order — Label Encoding would imply Germany > France > Spain which is meaningless. OHE creates separate binary features, letting XGBoost independently learn each category's effect."
      },
      {
        q: "Should you scale features before using XGBoost?",
        a: "No — tree-based models are invariant to monotonic feature transformations. They make binary splits based on thresholds, so scale doesn't matter. Scaling is essential for gradient descent-based and distance-based models."
      }
    ],
    interviewMode: {
      howToAnswer: "Walk through encoding → scaling → imputation. For each, explain when to use which method and why. Mention leakage risks at every step.",
      followUps: [
        "When would you use Target Encoding over One-Hot?",
        "Why is RobustScaler better with outliers?",
        "How do you handle a new category at inference time?"
      ],
      traps: [
        "Applying One-Hot to high-cardinality features",
        "Scaling before train-test split",
        "Not knowing that trees don't need scaling"
      ]
    }
  },
  {
    id: "class-imbalance",
    title: "Class Imbalance",
    tagline: "Your churn project directly involved this",
    phase: "Fundamentals",
    phaseNum: 2,
    color: "purple",
    sections: [
      {
        icon: "📖",
        title: "Technical Definition",
        content: `Class imbalance occurs when one class in the target variable significantly outnumbers another. E.g., 90% non-churn, 10% churn. Models trained naively will predict the majority class and achieve high accuracy but useless recall.`
      },
      {
        icon: "⚖️",
        title: "Techniques to Handle Imbalance",
        content: `**1. Algorithm-level (adjust the model):**
- \`class_weight='balanced'\` in sklearn — multiplies the loss of minority class samples
- \`scale_pos_weight\` in XGBoost — set to (negatives / positives)

**2. Resampling the data:**
- **SMOTE:** Synthetic Minority Over-sampling. Creates synthetic samples by interpolating between existing minority points.
- **Undersampling:** Randomly remove majority class samples. Risk: losing information.
- **SMOTEENN:** SMOTE + Edited Nearest Neighbours.

**3. Threshold adjustment:** Instead of 0.5, set a lower threshold to increase recall.

⚠️ SMOTE must be applied only on the training set, never on the full dataset.`
      }
    ],
    interviewQA: [
      {
        q: "What is SMOTE and how does it work?",
        a: "SMOTE generates new minority samples by interpolation. For each minority sample, it finds K nearest minority neighbours, then creates synthetic samples along the line segments connecting them."
      },
      {
        q: "What is scale_pos_weight in XGBoost?",
        a: "scale_pos_weight controls the weight given to positive class samples. Setting it to (count_negative / count_positive) makes XGBoost treat each positive sample as if it appears more frequently, balancing the gradient updates."
      }
    ],
    interviewMode: {
      howToAnswer: "Explain the problem (majority class dominance), then three levels of solution: algorithm-level (class weights), data-level (SMOTE), and decision-level (threshold tuning).",
      followUps: [
        "Why can't you apply SMOTE on the entire dataset?",
        "How does class_weight='balanced' work internally?",
        "What's the difference between oversampling and undersampling?"
      ],
      traps: [
        "Applying SMOTE before train-test split",
        "Using accuracy as the metric on imbalanced data",
        "Not knowing how scale_pos_weight is calculated"
      ]
    }
  },
  {
    id: "regularization",
    title: "Regularization",
    tagline: "How we prevent a model from memorising noise",
    phase: "Fundamentals",
    phaseNum: 2,
    color: "purple",
    sections: [
      {
        icon: "📖",
        title: "Technical Definition",
        content: `Regularization adds a penalty term to the loss function that discourages the model from learning overly complex patterns.

\`Regularized Loss = Loss(y, ŷ) + λ × Penalty(weights)\``
      },
      {
        icon: "🔧",
        title: "L1 vs L2 vs ElasticNet",
        content: `**L1 Regularization (Lasso):** \`Loss + λ × Σ|wᵢ|\`
Drives some weights exactly to zero → automatic feature selection. Produces sparse models.

**L2 Regularization (Ridge):** \`Loss + λ × Σwᵢ²\`
Shrinks all weights toward zero but rarely exactly zero. Handles multicollinearity well.

**ElasticNet:** Combination of L1 + L2. Best of both worlds.

> In XGBoost: \`alpha\` = L1 regularization on leaf weights. \`lambda\` = L2 regularization on leaf weights.`
      }
    ],
    interviewQA: [
      {
        q: "When would you use L1 over L2 regularization?",
        a: "Use L1 (Lasso) when you have many features and suspect only a few are truly relevant — it performs implicit feature selection. Use L2 (Ridge) when most features contribute and you want smooth shrinkage. Use ElasticNet when you want both."
      },
      {
        q: "What happens when λ is too high?",
        a: "Too high λ over-penalizes the model, driving all weights toward zero. The model becomes too simple and underfits (high bias). The optimal λ is found by cross-validation."
      }
    ],
    interviewMode: {
      howToAnswer: "Write the regularized loss function. Explain L1 (sparsity/feature selection) vs L2 (smooth shrinkage). Connect to bias-variance: regularization increases bias to reduce variance.",
      followUps: [
        "Why does L1 produce exact zeros but L2 doesn't?",
        "How does lambda relate to the bias-variance tradeoff?",
        "What regularization does XGBoost use?"
      ],
      traps: [
        "Not knowing L1 produces sparse models",
        "Confusing regularization strength direction (high λ = more regularization)",
        "Not connecting regularization to bias-variance"
      ]
    }
  },
  // ─── Phase 3: Algorithms ──────────────────────────────────────
  {
    id: "decision-trees",
    title: "Decision Trees",
    tagline: "The building block of the most powerful algorithms",
    phase: "Algorithms",
    phaseNum: 3,
    color: "amber",
    sections: [
      {
        icon: "📖",
        title: "Technical Definition",
        content: `A Decision Tree recursively partitions the feature space by choosing the best split at each node, creating a tree structure where leaves represent predictions. It is a non-parametric, interpretable model.`
      },
      {
        icon: "⚙️",
        title: "How It Works",
        content: `At each node, the algorithm searches all features and all possible split points to find the one that **maximises information gain** (classification) or **minimises MSE** (regression).

**Gini Impurity:** \`Gini = 1 - Σ(pᵢ)²\`

**Entropy:** \`Entropy = -Σ pᵢ log₂(pᵢ)\`

> Gini is faster to compute. Entropy is slightly more sensitive. In practice, results are nearly identical.`
      }
    ],
    hyperparameters: [
      { name: "max_depth", default: "None", effect: "Limits tree depth. Low → underfitting. High → overfitting. Most important parameter." },
      { name: "min_samples_split", default: "2", effect: "Minimum samples to split a node. Higher = simpler tree." },
      { name: "min_samples_leaf", default: "1", effect: "Minimum samples at a leaf. Higher = smoother predictions." },
      { name: "max_features", default: "None", effect: "Features to consider at each split. Adds randomness. Key in Random Forest." },
      { name: "criterion", default: "gini", effect: "Split quality: 'gini' or 'entropy'. Minimal practical difference." }
    ],
    interviewQA: [
      {
        q: "What are the main disadvantages of Decision Trees?",
        a: "1. High variance — small data changes produce different trees. 2. Prone to overfitting without pruning. 3. Axis-aligned splits only. 4. Not good for extrapolation. These weaknesses motivated ensemble methods."
      },
      {
        q: "Gini vs Entropy — which is better?",
        a: "In practice, both produce very similar trees. Gini is computationally cheaper. Entropy is slightly more sensitive to class probability changes. sklearn defaults to Gini."
      }
    ],
    interviewMode: {
      howToAnswer: "Explain the recursive splitting process. Mention Gini vs Entropy briefly. Focus on why single trees are limited and how ensembles fix these limitations.",
      followUps: [
        "How does a decision tree handle continuous features?",
        "What is pruning and why is it needed?",
        "Can a decision tree model XOR?"
      ],
      traps: [
        "Not knowing that trees can't extrapolate beyond training data range",
        "Not connecting tree weaknesses to why ensembles exist",
        "Overcomplicating Gini vs Entropy when the difference is minimal"
      ]
    }
  },
  {
    id: "random-forest",
    title: "Random Forest",
    tagline: "Bagging + feature randomness = powerful ensemble",
    phase: "Algorithms",
    phaseNum: 3,
    color: "amber",
    sections: [
      {
        icon: "📖",
        title: "Technical Definition",
        content: `Random Forest is a bagging ensemble of Decision Trees where each tree is trained on a bootstrap sample and each split considers only a random subset of features. Predictions are by majority vote (classification) or mean (regression).

Two sources of randomness: (1) bootstrap sampling of rows, (2) random feature subset at each split. This decorrelates trees, making the ensemble much better than any single tree.`
      },
      {
        icon: "⚙️",
        title: "Why It Works — Bagging",
        content: `**Bootstrap Aggregation (Bagging):** Each tree trains on a random sample (with replacement). About 63% of rows appear in each bootstrap sample. The 37% not sampled are "out-of-bag" (OOB) samples.

**OOB Score:** Each sample is OOB for ~37% of trees. You can evaluate on OOB samples — a free cross-validation.

> Bagging reduces variance without significantly increasing bias. Individual trees overfit, but averaging many uncorrelated trees cancels out the variance.`
      }
    ],
    hyperparameters: [
      { name: "n_estimators", default: "100", effect: "Number of trees. More = better, with diminishing returns." },
      { name: "max_depth", default: "None", effect: "Deeper trees = lower bias, higher variance per tree. RF corrects via averaging." },
      { name: "max_features", default: "'sqrt'", effect: "Features per split. sqrt(n_features) for classification. Lower = more randomness." },
      { name: "min_samples_leaf", default: "1", effect: "Minimum leaf size. Increase to smooth predictions." },
      { name: "bootstrap", default: "True", effect: "Whether to use bootstrap samples. False = just feature randomness." },
      { name: "oob_score", default: "False", effect: "Set True to compute out-of-bag score — free validation." }
    ],
    interviewQA: [
      {
        q: "How does Random Forest reduce overfitting compared to a single Decision Tree?",
        a: "A single deep tree has high variance. RF trains many such trees but decorrelates them via bootstrap sampling and random feature subsets. When you average uncorrelated high-variance models, variance cancels out while bias stays similar."
      },
      {
        q: "When would you prefer XGBoost over Random Forest?",
        a: "XGBoost is generally stronger for tabular data with maximum performance needs. RF is preferred for fast training with minimal tuning, noisy data, or when quick feature importance is needed."
      }
    ],
    interviewMode: {
      howToAnswer: "Explain the two sources of randomness (bootstrap rows + random features). Then explain why averaging uncorrelated models reduces variance. Mention OOB score as a bonus.",
      followUps: [
        "What is the OOB score and how is it computed?",
        "Why does max_features decorrelate trees?",
        "How would you tune n_estimators?"
      ],
      traps: [
        "Not knowing what bootstrap sampling does",
        "Confusing bagging with boosting",
        "Saying RF reduces bias (it reduces variance)"
      ]
    }
  },
  {
    id: "ensemble-methods",
    title: "Ensemble Methods",
    tagline: "Combining weak learners to create a strong one",
    phase: "Algorithms",
    phaseNum: 3,
    color: "amber",
    sections: [
      {
        icon: "📖",
        title: "Technical Definition",
        content: `Ensemble methods combine multiple base models to produce a prediction that is more accurate and robust than any individual model. The key insight: diverse models that make different errors can be combined to cancel those errors.`
      },
      {
        icon: "🏗️",
        title: "Bagging vs Boosting vs Stacking",
        content: `**Bagging:** Train models independently on random subsets. Combine by averaging/voting. Reduces variance. Random Forest is bagging of trees.

**Boosting:** Train models sequentially. Each new model focuses on errors of the previous. Reduces bias. XGBoost, LightGBM, AdaBoost.

**Stacking:** Train diverse base models. Use their predictions as features for a meta-model. Most powerful but complex.

> **Bagging** → reduces variance (fixes overfitting)
> **Boosting** → reduces bias (fixes underfitting)
> **Stacking** → reduces both, but complex`
      },
      {
        icon: "⚖️",
        title: "Weighted Ensemble",
        content: `\`Final prediction = w₁ × XGB_pred + w₂ × LGB_pred\`

Weights can be set manually or optimized on validation set. If XGBoost and LightGBM make different errors, their weighted average reduces those errors.

> XGBoost and LightGBM together work because they use different algorithms internally (level-wise vs leaf-wise growth), producing uncorrelated errors.`
      }
    ],
    interviewQA: [
      {
        q: "Why does boosting reduce bias while bagging reduces variance?",
        a: "Bagging builds independent high-variance models and averages them — averaging uncorrelated models reduces variance. Boosting builds models sequentially, each correcting residual errors — this iterative error correction reduces systematic bias."
      },
      {
        q: "How did you determine the weights in your weighted ensemble?",
        a: "Evaluate both models on validation set. The model with lower error receives higher weight. Weights can be optimized using grid search over combinations to minimize error on validation."
      }
    ],
    interviewMode: {
      howToAnswer: "Compare bagging vs boosting vs stacking in a table. For each: how it works, what it reduces, and an example algorithm.",
      followUps: [
        "Why not stack 100 models?",
        "Can you combine bagging and boosting?",
        "What makes two models 'diverse' in an ensemble?"
      ],
      traps: [
        "Confusing which one reduces bias vs variance",
        "Not knowing stacking can cause data leakage",
        "Thinking more models always = better ensemble"
      ]
    }
  },
  {
    id: "linear-regression",
    title: "Linear Regression",
    tagline: "Simple, interpretable, and still extremely useful",
    phase: "Algorithms",
    phaseNum: 3,
    color: "amber",
    sections: [
      {
        icon: "📖",
        title: "Technical Definition",
        content: `Linear Regression models the relationship between a continuous target and features by fitting a linear equation. It minimizes the sum of squared residuals (OLS).

\`ŷ = β₀ + β₁x₁ + β₂x₂ + ... + βₙxₙ\``
      },
      {
        icon: "📋",
        title: "Key Assumptions (OLS)",
        content: `1. **Linearity:** Relationship between features and target is linear.
2. **Independence:** Observations are independent (no autocorrelation).
3. **Homoscedasticity:** Constant variance of residuals.
4. **Normality of residuals:** Residuals are approximately normal.
5. **No multicollinearity:** Features are not highly correlated.

⚠️ Real-world data rarely satisfies all assumptions. Tree-based models make no such assumptions.`
      }
    ],
    interviewQA: [
      {
        q: "What is multicollinearity and why is it a problem?",
        a: "Multicollinearity occurs when features are highly correlated. This makes coefficient estimates unstable. Detection: VIF. Fix: Remove correlated features, use PCA, or use Ridge regression."
      },
      {
        q: "How is R² interpreted and what are its limitations?",
        a: "R² measures proportion of variance explained by the model. Limitation: R² always increases with more features, even irrelevant ones. Adjusted R² penalizes for extra features."
      }
    ],
    interviewMode: {
      howToAnswer: "Write the equation. List assumptions. Explain OLS minimization. Be ready to discuss violations and what to do about them.",
      followUps: [
        "What happens when assumptions are violated?",
        "How does Ridge regression handle multicollinearity?",
        "What's the difference between R² and adjusted R²?"
      ],
      traps: [
        "Not knowing the five assumptions",
        "Saying high R² means the model is good",
        "Not knowing what to do when assumptions fail"
      ]
    }
  },
  {
    id: "logistic-regression",
    title: "Logistic Regression",
    tagline: "A classification algorithm, despite the name",
    phase: "Algorithms",
    phaseNum: 3,
    color: "amber",
    sections: [
      {
        icon: "📖",
        title: "Technical Definition",
        content: `Logistic Regression models the probability of a binary outcome using the sigmoid function:

\`P(y=1|X) = σ(β₀ + β₁x₁ + ... + βₙxₙ)\`
\`σ(z) = 1 / (1 + e⁻ᶻ)\`

It is a linear classifier — the decision boundary is a hyperplane.`
      },
      {
        icon: "🔢",
        title: "Log-Odds & Coefficients",
        content: `Logistic regression models the **log-odds** (logit):

\`log(P/(1-P)) = β₀ + β₁x₁ + ... + βₙxₙ\`

Each coefficient βᵢ represents the change in log-odds per unit increase in xᵢ. **exp(βᵢ)** is the odds ratio.

> Trained by maximizing Log-Likelihood (equivalent to minimizing Binary Cross-Entropy Loss), not squared errors.`
      }
    ],
    hyperparameters: [
      { name: "C", default: "1.0", effect: "Inverse of regularization strength. Small C = strong regularization." },
      { name: "penalty", default: "'l2'", effect: "'l1' for feature selection, 'l2' for general use." },
      { name: "solver", default: "'lbfgs'", effect: "Optimization algorithm. 'saga' for l1/elasticnet." },
      { name: "max_iter", default: "100", effect: "Max iterations for convergence." },
      { name: "class_weight", default: "None", effect: "'balanced' adjusts for imbalanced classes." }
    ],
    interviewQA: [
      {
        q: "Why is Logistic Regression a classification model and not regression?",
        a: "Despite the name, it outputs a probability between 0 and 1 using the sigmoid function, then applies a threshold to produce a class label. The 'regression' refers to the internal linear model, not the output type."
      },
      {
        q: "When would you use Logistic Regression over XGBoost?",
        a: "When interpretability is critical, dataset is small/simple, features are linearly separable, inference speed matters, or you need calibrated probabilities."
      }
    ],
    interviewMode: {
      howToAnswer: "Write the sigmoid function. Explain log-odds. Show how coefficients are interpretable. Compare to linear regression (different loss function, different output).",
      followUps: [
        "How do you interpret logistic regression coefficients?",
        "What loss function does logistic regression use?",
        "How do you extend to multiclass?"
      ],
      traps: [
        "Calling it a regression algorithm",
        "Not knowing the loss function (BCE vs MSE)",
        "Not understanding that the decision boundary is linear"
      ]
    }
  },
  {
    id: "xgboost",
    title: "XGBoost",
    tagline: "The most important algorithm for tabular data interviews",
    phase: "Algorithms",
    phaseNum: 3,
    color: "coral",
    star: true,
    sections: [
      {
        icon: "📖",
        title: "Technical Definition",
        content: `XGBoost (Extreme Gradient Boosting) is a scalable, regularized gradient boosting framework that builds an ensemble of shallow decision trees sequentially, where each new tree fits the residual errors (gradients) of the current ensemble.

It uses second-order (Newton) gradient information for faster, more accurate optimization.`
      },
      {
        icon: "⚙️",
        title: "How It Works — Step by Step",
        content: `1. **Initialize:** Start with a base prediction (mean of target for regression, log-odds for classification).
2. **Compute residuals:** Calculate gradient (first derivative) and hessian (second derivative) of the loss.
3. **Fit a tree:** Build a shallow tree that best predicts the gradients.
4. **Update predictions:** Add tree's output (scaled by learning rate η) to ensemble.
5. **Repeat:** Iterate for n_estimators trees or until early stopping.

\`F_m(x) = F_{m-1}(x) + η × h_m(x)\`

> Each tree is fitting the ERRORS of the current model, not the original target. This is gradient descent in function space.`
      },
      {
        icon: "🆚",
        title: "XGBoost vs Traditional Gradient Boosting",
        content: `- **Regularization:** XGBoost has built-in L1/L2. Traditional GB does not.
- **Second-order gradients:** XGBoost uses hessians for more precise splits.
- **Speed:** Parallel processing on columns during tree construction.
- **Missing values:** XGBoost handles them internally with learned default direction.
- **Pruning:** Uses "max_depth" pruning. More efficient than post-pruning.`
      }
    ],
    hyperparameters: [
      { name: "n_estimators", default: "100", effect: "Number of trees. Use early_stopping instead of guessing." },
      { name: "learning_rate (eta)", default: "0.3", effect: "Shrinks each tree. Lower η → more trees needed, but better generalization. Use 0.01-0.1." },
      { name: "max_depth", default: "6", effect: "Max tree depth. 3-8 typical. Lower = more regularization." },
      { name: "min_child_weight", default: "1", effect: "Min sum of hessians in a leaf. Higher = more conservative." },
      { name: "subsample", default: "1.0", effect: "Fraction of rows per tree. 0.5-0.8 adds randomness." },
      { name: "colsample_bytree", default: "1.0", effect: "Fraction of features per tree. 0.5-0.8 adds diversity." },
      { name: "gamma", default: "0", effect: "Min loss reduction for split. Higher = more conservative." },
      { name: "lambda (reg_lambda)", default: "1", effect: "L2 regularization on leaf weights." },
      { name: "alpha (reg_alpha)", default: "0", effect: "L1 regularization on leaf weights." },
      { name: "scale_pos_weight", default: "1", effect: "Balances classes. Set to (negatives/positives) for imbalanced data." },
      { name: "early_stopping_rounds", default: "-", effect: "Stop if no improvement for N rounds. Prevents overfitting." }
    ],
    interviewQA: [
      {
        q: "Explain how XGBoost handles missing values.",
        a: "XGBoost learns a default direction for missing values during training. For each split, it tries routing missing value samples to the left and right, picking the direction with higher gain. This means XGBoost imputes implicitly."
      },
      {
        q: "What does learning_rate do and why is lower better?",
        a: "Learning rate scales each tree's contribution. Low learning rate means each tree makes a tiny correction — the model learns slowly but carefully. Combined with more trees, it achieves better generalization at the cost of longer training."
      },
      {
        q: "Why did you optimize for F1 in your XGBoost churn model?",
        a: "Churn is imbalanced. Accuracy would be misleading. F1 captures both precision and recall. We also set scale_pos_weight to handle the imbalance at the algorithm level."
      },
      {
        q: "What is early stopping and why did you use it?",
        a: "Early stopping monitors a validation metric and stops when it hasn't improved for N rounds. It prevents overfitting and saves computation. The model keeps the best iteration's weights."
      }
    ],
    interviewMode: {
      howToAnswer: "Explain gradient boosting in 3 sentences: sequential trees, each fits the residual, learning rate shrinks contributions. Then go deep on any hyperparameter they ask about. Mention you used it in all 3 projects.",
      followUps: [
        "Walk me through one iteration of XGBoost.",
        "Why does XGBoost use second-order gradients?",
        "How would you tune XGBoost hyperparameters?",
        "What's the tuning order for hyperparameters?"
      ],
      traps: [
        "Not knowing that trees fit residuals, not original targets",
        "Not understanding the difference between xgboost and traditional gradient boosting",
        "Saying you tune learning_rate first (it should be last)"
      ]
    }
  },
  {
    id: "lightgbm",
    title: "LightGBM",
    tagline: "Faster than XGBoost, often just as accurate",
    phase: "Algorithms",
    phaseNum: 3,
    color: "amber",
    sections: [
      {
        icon: "📖",
        title: "Technical Definition",
        content: `LightGBM (Light Gradient Boosting Machine) by Microsoft uses leaf-wise tree growth and two novel techniques — GOSS and EFB — to achieve significantly faster training with lower memory usage.`
      },
      {
        icon: "🔑",
        title: "Key Innovations vs XGBoost",
        content: `**1. Leaf-wise (Best-first) Tree Growth:**
XGBoost grows trees level-by-level. LightGBM grows leaf-by-leaf, always expanding the leaf with maximum delta loss. This leads to deeper, asymmetric trees.

> Leaf-wise can overfit on small datasets. Always set min_data_in_leaf.

**2. GOSS (Gradient-based One-Side Sampling):**
Keeps samples with large gradients (high error) and randomly samples from small-gradient samples. Reduces data size without losing accuracy.

**3. EFB (Exclusive Feature Bundling):**
Bundles mutually exclusive features into single features. Speeds up split finding.`
      },
      {
        icon: "🆚",
        title: "LightGBM vs XGBoost Comparison",
        content: `| Property | XGBoost | LightGBM |
|---|---|---|
| Tree growth | Level-wise | Leaf-wise |
| Speed | Fast | Faster (10-20x) |
| Memory | Higher | Lower |
| Small datasets | Better | Overfitting risk |
| Large datasets | Slower | Dominant choice |
| Categorical support | Manual encoding | Native |`
      }
    ],
    hyperparameters: [
      { name: "num_leaves", default: "31", effect: "Max leaves. Main complexity control. Should be < 2^max_depth." },
      { name: "learning_rate", default: "0.1", effect: "Step size. Lower + more trees = better generalization." },
      { name: "n_estimators", default: "100", effect: "Boosting rounds. Use early stopping." },
      { name: "min_data_in_leaf", default: "20", effect: "Critical for leaf-wise growth. Most important regularization param." },
      { name: "feature_fraction", default: "1.0", effect: "Fraction of features per tree. Like colsample_bytree." },
      { name: "bagging_fraction", default: "1.0", effect: "Fraction of data per tree. Like subsample." },
      { name: "lambda_l1", default: "0", effect: "L1 regularization on leaf scores." },
      { name: "lambda_l2", default: "0", effect: "L2 regularization on leaf scores." },
      { name: "is_unbalance", default: "False", effect: "Set True for imbalanced classification." }
    ],
    interviewQA: [
      {
        q: "Explain leaf-wise vs level-wise tree growth.",
        a: "Level-wise (XGBoost) expands all leaves at the same depth simultaneously. Leaf-wise (LightGBM) always picks the single leaf with highest gain. This creates deeper, asymmetric trees that reduce loss faster with fewer leaves. Downside: higher overfitting risk on small datasets."
      },
      {
        q: "Why did combining XGBoost + LightGBM improve your forecast?",
        a: "They use different algorithms (level-wise vs leaf-wise, different sampling). Their errors are partially uncorrelated. Weighted average of uncorrelated predictions reduces overall error — the fundamental principle behind diverse ensembles."
      },
      {
        q: "What is num_leaves and why is it more important than max_depth?",
        a: "In leaf-wise growth, the tree is defined by number of leaf nodes, not depth. A tree with 31 leaves can be very deep asymmetrically. num_leaves directly bounds model complexity. Setting it too high causes overfitting."
      }
    ],
    interviewMode: {
      howToAnswer: "Explain the three innovations (leaf-wise, GOSS, EFB). Compare directly with XGBoost. Mention when each is preferred. Talk about your ensemble approach.",
      followUps: [
        "Why is leaf-wise faster than level-wise?",
        "What is GOSS and why does it work?",
        "When would you still prefer XGBoost over LightGBM?"
      ],
      traps: [
        "Not knowing the three key innovations",
        "Saying LightGBM is always better than XGBoost",
        "Not knowing num_leaves is the primary complexity control"
      ]
    }
  }
];
