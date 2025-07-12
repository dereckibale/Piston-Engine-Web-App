DROP DATABASE IF EXISTS mechanical_engineering_formulas;
CREATE DATABASE mechanical_engineering_formulas;
USE mechanical_engineering_formulas;

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT
);
INSERT INTO categories (name, description)
VALUES (
    'Otto Cycle',
    'Formulas related to the ideal Otto cycle used in spark-ignition internal combustion engines.'
);

CREATE TABLE formulas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT,
    name VARCHAR(150) NOT NULL,
    symbol VARCHAR(255) NOT NULL,
    latex TEXT,
    description TEXT,
    variables JSON,
    solvable BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);
INSERT INTO formulas (category_id, name, symbol, latex, description, variables, solvable)
VALUES (
    1,
    'Thermal Efficiency of Otto Cycle',
    'η = 1 - 1 / r^(γ - 1)',
    '\\eta = 1 - \\frac{1}{r^{\\gamma - 1}}',
    'Calculates the ideal thermal efficiency of the Otto cycle given the compression ratio and specific heat ratio.',
    '["r", "γ"]',
    TRUE
);
INSERT INTO formulas (category_id, name, symbol, latex, description, variables, solvable)
VALUES (
    1,
    'Compression Pressure Ratio',
    'P2 / P1 = r^γ',
    '\\frac{P_2}{P_1} = r^{\\gamma}',
    'Calculates pressure increase during isentropic compression in the Otto cycle.',
    '["r", "γ"]',
    TRUE
);
INSERT INTO formulas (category_id, name, symbol, latex, description, variables, solvable)
VALUES (
    1,
    'Mean Effective Pressure (MEP)',
    'MEP = W_net / V_d',
    '\\text{MEP} = \\frac{W_{net}}{V_d}',
    'Defines mean effective pressure as net work output divided by displacement volume.',
    '["W_net", "V_d"]',
    TRUE
);

CREATE TABLE variables (
    id INT AUTO_INCREMENT PRIMARY KEY,
    symbol VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    unit VARCHAR(50),
    description TEXT
);
INSERT INTO variables (symbol, name, unit, description) VALUES
('η', 'Thermal Efficiency', 'unitless', 'Ratio of net work output to heat input'),
('r', 'Compression Ratio', 'unitless', 'Ratio of maximum to minimum volume in the cycle'),
('γ', 'Specific Heat Ratio', 'unitless', 'Ratio of Cp to Cv, typically 1.4 for air'),
('P1', 'Initial Pressure', 'Pa', 'Pressure before compression begins'),
('P2', 'Final Pressure after Compression', 'Pa', 'Pressure after isentropic compression'),
('W_net', 'Net Work Output', 'J', 'Total net work produced by the cycle'),
('V_d', 'Displacement Volume', 'm³', 'Volume displaced by the piston during a stroke'),
('MEP', 'Mean Effective Pressure', 'Pa', 'Theoretical constant pressure producing same net work');

SELECT * FROM formulas;