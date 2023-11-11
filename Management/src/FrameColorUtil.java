import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import java.awt.Color;
import java.awt.Component;
import java.awt.Container;
/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *
 * @author OwPor
 */
public class FrameColorUtil {
    public static void setColors(JFrame frame, Color labelColor, Color panelColor) {
        // Set label foreground color
        setLabelColors(frame, labelColor);

        // Set panel background color
        setPanelColors(frame, panelColor);
    }

    private static void setLabelColors(Container container, Color labelColor) {
        Component[] components = container.getComponents();
        for (Component component : components) {
            if (component instanceof JLabel) {
                JLabel label = (JLabel) component;
                label.setForeground(labelColor);
            }
            if (component instanceof Container) {
                setLabelColors((Container) component, labelColor);
            }
        }
    }

    private static void setPanelColors(Container container, Color panelColor) {
        Component[] components = container.getComponents();
        for (Component component : components) {
            if (component instanceof JPanel) {
                JPanel panel = (JPanel) component;
                panel.setBackground(panelColor);
            }
            if (component instanceof Container) {
                setPanelColors((Container) component, panelColor);
            }
        }
    }
}
