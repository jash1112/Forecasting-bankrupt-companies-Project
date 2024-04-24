# Project 4: Forecasting bankrupt companies


# Project Proposal:

## Introduction:
Financial failure is considered one of the greatest challenges for business organizations because of its extremely dangerous effects on the economies of countries around the world, if an enterprise is exposed to financial failure and is referred for liquidation, it has consequences that may lead to the deterioration of the local economy.  A result of several companies has failed financially recently and was the most prominent of which is the financial failure of Lehman Brothers in 2008 during the global financial crisis, with assets amounting to 691 billion US dollars, and Washington Mutual in the same year with assets estimated at 328 billion dollars. One of the most famous financial failures in the current year 2023 is what Silicon Valley Bank suffered when it declared bankruptcy with assets amounting to 209 billion US dollars.

## Project Goals
 The main objective of this study is to develop a model to predict the financial failure of business enterprises using an artificial neural network model by relying on the model’s inputs on a set of financial indicators. This goal is achieved by  the following sub-objectives:
- Identify the latest developments in practical application in confronting financial failure using artificial intelligence systems, especially artificial neural networks, in predicting the financial failure of stock companies listed on the Canadian stock market.

## Study Hypotheses:
The study includes the following hypotheses:
- The first hypothesis (H1): The use of multi-layer neural networks predicts the financial failure of stock companies registered in the Canadian stock market.
- The second hypothesis (H2): There is a statistically significant effect of the combination of ratios and financial indicators on the accuracy of multi-layer neural networks to predict the financial failure of stock companies registered in the Canadian stock market.

# Machine Learning Models:

## Neural Network
Traditionally, the Altman Z-score has been pivotal in assessing the likelihood of a company, particularly within manufacturing, facing bankruptcy. This approach relies on analyzing profitability, leverage, liquidity, solvency, and activity ratios.
In our Neural Network model tailored for bankruptcy prediction, we employ a comprehensive set of features including 'Current ratio', 'Quick Ratio', 'Cash ratio', and a range of financial metrics such as 'Return On Equity (ROE)', 'Net profit margin', and 'Debt-to-assets ratio', among others. This expanded feature set allows for a more nuanced evaluation compared to the traditional Altman Z-score methodology.
The Neural Network demonstrates a superior accuracy rate of 97% in identifying companies at risk of distress, surpassing the 72% accuracy typically achieved by the Altman Z-score. By leveraging a broader spectrum of financial indicators, our model enhances predictive capabilities, offering valuable insights into a company's financial health.

## Regression Models for Altman Z-score Prediction
In addition to the Neural Network, we've employed both Linear Regression and Decision Tree Regression models to forecast the Altman Z-score for selected companies. Our evaluation criteria set a threshold R-squared score of 0.50 for model performance.
For the Linear Regression model, the assessment yields the following metrics:
Mean Absolute Error (MAE): 4.81
Mean Squared Error (MSE): 400.50
R-squared: 0.50
Root Mean Squared Error (RMSE): 20.01
Standard Deviation: 19.91
These results indicate a strong performance, with our model closely aligning its predictions with actual values.
Similarly, our Decision Tree model also exhibits robust performance in forecasting the Altman Z-score.


## The Project Sample:
Companies listed on the Canadian stock market during the period 2013  - 2022.

## Team Members:
1. Aayush Chhaperwal
2. I Lun Wu
3. Jash Bikash
4. Johnny Nguyen
5. Maher Alqarra
